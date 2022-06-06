import json
import threading
from time import time
from flask_restful import Resource
from flask import request
import os
import shutil
from os import path, makedirs
from model.model_functions import break_into_sentences, load_segmentation_model, load_sentence_encoder, run_segmentation
from model.transcript_functions import upload_audio,save_transcript
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import wave
import contextlib


def generate_title(seg):
  output_dir="./model/outputs" 

  path = os.path.join(output_dir, "model_files")
  model = AutoModelForSeq2SeqLM.from_pretrained(path)
  tokenizer = AutoTokenizer.from_pretrained(path)
  input_ids = tokenizer.encode("summarize: " + seg, return_tensors="pt", add_special_tokens=True)
  generated_ids = model.generate(input_ids=input_ids,num_beams=5,max_length=50,repetition_penalty=2.5,length_penalty=1,early_stopping=True,num_return_sequences=3)
  preds = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in generated_ids]
  print("Title: ", preds[-1])
  print(preds)
  return preds[-1]

def convert_to_timestamp(millis):
  millis = int(millis)
  seconds=(millis/1000)%60
  seconds = int(seconds)
  minutes=(millis/(1000*60))%60
  minutes = int(minutes)
  hours=int((millis/(1000*60*60))%24)

  return hours,minutes,seconds

def get_wav_length(path):
    with contextlib.closing(wave.open(path,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        return duration


def compute_result(**kwargs):
  videoDirPath = kwargs.get('videoDirPath', '')
  audioPath = kwargs.get('audioPath', '')

  audio_url = upload_audio(audioPath)
  data = save_transcript(audio_url=audio_url)

  audio_length_ms = get_wav_length(audioPath) * 1000
  
  sentences = break_into_sentences(text=data['text'])


  model_path = "./model/lstm-checkpoints-2checkpoint025.pt"

  model = load_segmentation_model(model_path)
  encoder = load_sentence_encoder()

  result = run_segmentation(model,encoder, sentences).tolist()
  result.append(1)

  
  # print(result)

  timestamps = get_timestamps(sentences=sentences,transcript=data)
  # print(timestamps)

  
  segment = ''
  segments = []
  start = '00:00:00'
  percent = 0
  for i in range(len(result)):
      if result[i] == 1:
          segment = segment + sentences[i]
          title = generate_title(segment)
          temp = start
          start = timestamps[i]['time']
          segments.append({'start':temp,'end':start,'segment':segment,'title':title,'percent':percent})
          percent = timestamps[i]['start'] / audio_length_ms
          segment = ''
      else:
          segment = segment + sentences[i]
  
  # print(segments)

  everything = {'data':data,'sentences':sentences, 'result_array':result, 'timestamps':timestamps,'segments':segments}
  json_object = json.dumps(everything, indent = 4)

  with open(f'{videoDirPath}/result.json','w') as f:
      f.write(json_object)
  # print(data)
  pass

def get_timestamps(sentences, transcript):
  transcript_start = 0
  timestamps = []
  for sentence in sentences:
    words = transcript['words'][transcript_start:]
    sentence_words = sentence.split(' ')
    if words[0]['text'] == sentence_words[0]:
      hours, minutes, seconds = convert_to_timestamp(words[0]['start'])
      timestamps.append({
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds,
          'start': words[0]['start'],
          'time': '{:0>2d}:{:0>2d}:{:0>2d}'.format(hours,minutes,seconds)
      })
      
      
    transcript_start += len(sentence_words)
  return timestamps
    
class UploadCompleteController(Resource):
  
    def post(self):
        fileGuid = request.args['fileGuid'].split(".")[0]
        fileNameExt = request.args['fileName']
        fileName = fileNameExt.split(".")[0]
        dirPath = f'./chunks/{fileGuid}'
        videoDirPath = f'./videos/{fileGuid}'
        for chunkName in os.listdir(dirPath):
            with open(os.path.join(dirPath, chunkName), 'rb') as chunkF:
                if not path.isdir(videoDirPath):
                    makedirs(videoDirPath)
                with open(f'{videoDirPath}/{fileNameExt}', 'ab') as f:
                    f.write(chunkF.read())
        shutil.rmtree(dirPath, ignore_errors=False)


        audioPath = f'{videoDirPath}/{fileName}.wav'

        command2wav = f'ffmpeg -i {videoDirPath}/{fileNameExt}  {audioPath}'

        os.system(command2wav)

        thread = threading.Thread(target=compute_result, kwargs={
                    'videoDirPath': videoDirPath, 'audioPath': audioPath})
        thread.start()

        # compute_result(videoDirPath=videoDirPath,audioPath=audioPath)

        

        return {"isSuccess" : True}
