# from __future__ import print_function
# from __future__ import division

import torch
import torch.nn as nn
from torch.autograd import Variable
import torch.nn.functional as F
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence
import numpy as np
from torch.nn import Dropout, Linear, BCEWithLogitsLoss
import math
from os import listdir
from os.path import isfile, join
from torch.utils.data import Dataset, DataLoader
import torch.nn.functional as F
from torchvision import transforms
from sentence_transformers import SentenceTransformer
from argparse import ArgumentParser
from termcolor import colored
import logging
import sys
import random
from pathlib2 import Path
from shutil import copy
import statistics
from matplotlib import pyplot as plt
from torchsummary import summary
from tqdm import notebook
import pandas as pd
import nltk
import json
from nltk.tokenize import sent_tokenize


device = "cuda" if torch.cuda.is_available() else "cpu"
config = {}

 
# Opening JSON file

def break_into_sentences(text):
  token_text = sent_tokenize(text)
  return token_text

def read_text(filePath):
    text = ""
    with open(filePath) as json_file:
        data = json.load(json_file)
        text = data['text']

    token_text = sent_tokenize(text)
    return token_text

def read_config_file(path='config.json'):
    global config

    with open(path, 'r') as f:
        config.update(json.load(f))


def maybe_cuda(x, is_cuda=None):
    global config

    if is_cuda is None and 'cuda' in config:
        is_cuda = config['cuda']

    if is_cuda:
        return x.cuda()
    return x


def setup_logger(logger_name, filename, delete_old = False):
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG)
    stderr_handler = logging.StreamHandler(sys.stderr)
    file_handler   = logging.FileHandler(filename, mode='w') if delete_old else logging.FileHandler(filename)
    file_handler.setLevel(logging.DEBUG)
    stderr_handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    stderr_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)
    logger.addHandler(stderr_handler)
    logger.addHandler(file_handler)
    return logger


def unsort(sort_order):
    result = [-1] * len(sort_order)

    for i, index in enumerate(sort_order):
        result[index] = i

    return result


logger = setup_logger(__name__, 'train.log')
profilerLogger = setup_logger("profilerLogger", 'profiler.log', True)


def zero_state(module, batch_size):
    # * 2 is for the two directions
    return Variable(torch.zeros(module.num_layers * 2, batch_size, module.hidden).to(device)), Variable(torch.zeros(module.num_layers * 2, batch_size, module.hidden).to(device))



class SegmentationModel(nn.Module):
    def __init__(self, hidden, num_layers=2):
      
        super(SegmentationModel, self).__init__()

        self.sentence_lstm = nn.LSTM(input_size=768,
                                     hidden_size=hidden,
                                     num_layers=num_layers,
                                     batch_first=True,
                                     dropout=0,
                                     bidirectional=True)

        # We have two labels

        self.ffc = nn.Sequential(
            nn.Linear(hidden*2, 2),
        ) 

        self.num_layers = num_layers
        self.hidden = hidden

        self.criterion = nn.CrossEntropyLoss()


    def forward(self, data, lengths):
        batch_size = data.size()[0]
        max_doc_size = data.size()[1]

        all_sizes = [s for s in lengths]

        sorted_idx = np.argsort(all_sizes)[::-1]
        
        sorted_sizes = sorted(all_sizes)[::-1]
        
        all_docs = []

        for batch in data:
          all_docs.extend(batch)

        sorted_padded_docs = [data[idx] for idx in sorted_idx]

        packed_input = torch.stack(sorted_padded_docs)

        packed_data = pack_padded_sequence(packed_input, lengths=sorted_sizes, batch_first=True)

        lstm_outputs, _ = self.sentence_lstm(packed_data, zero_state(self, batch_size=batch_size))
        unpacked_data, lens_unpacked = pad_packed_sequence(lstm_outputs, batch_first=True)

        unpadded_sorted_outputs = []

        for i, length in enumerate(sorted_sizes):
          unpadded_sorted_outputs.append(unpacked_data[i,0:length-1,:])

        # print(lens_unpacked)
        unsorted_doc_outputs = [unpadded_sorted_outputs[i] for i in unsort(sorted_idx)]
        # print(unpacked_data.size())

        sentence_outputs = torch.cat(unsorted_doc_outputs, 0)
        # sentence_outputs = torch.stack(unsorted_doc_outputs)

     
        # logger.debug("sentence output size: %s",sentence_outputs.size())
        x = self.ffc(sentence_outputs)

        return x


def createModel():
    return SegmentationModel(hidden=256, num_layers=2)




# Prediction

def predict(model, input):
    model.eval()
    
    average_pk_4 = 0
    average_pk_6 = 0
    average_pk = 0
    k = 0

    feats = input[0].to(device)
    length = input[1]
    output = model(feats,length)
    
    output_softmax = torch.nn.functional.softmax(output, 1)
    
    output_seg = output.data.cpu().numpy().argmax(axis=1)

    return output_seg


def load_segmentation_model(path):

  model = createModel()
  model = model.to(device)
  
  checkpoint = torch.load(path,map_location='cpu')
  model.load_state_dict(checkpoint['state_dict'])
 
  return model


def load_sentence_encoder():
  sentence_encoder = SentenceTransformer('all-distilroberta-v1')
  return sentence_encoder

def transform(sentences, encoder):
  embeddings = encoder.encode(sentences)
  length =  embeddings.shape[0]
  return torch.tensor([embeddings]), torch.tensor(np.asarray([length]))


# @param: list of sentences.
# @returns: array: x -> [0,1]
def run_segmentation(model,encoder,input):
  X = transform(input, encoder)
  prediction = predict(model, X)
  return prediction

if __name__ == '__main__':
  
  # #call api for transcripting video
  # pass
  

  # change the model path
  model_path = "./lstm-checkpoints-2checkpoint025.pt"

  model = load_segmentation_model(model_path)
  encoder = load_sentence_encoder()

  # input = ["hello todays topic is machine learning", "we will discuss supervised learning","baby kiss me",
  #          "exams are on monday","so we end todays class"]
  input = read_text("transcript_data.json")

  print(input)

  # result will be an array of 0s and 1s. last sentence hamesha 1 hoga islye woh omitted ha.
  result = run_segmentation(model,encoder, input)

  
  print(result)