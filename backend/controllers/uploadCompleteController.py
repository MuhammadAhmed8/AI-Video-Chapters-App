from flask_restful import Resource
from flask import request
import os
import shutil
from os import path, makedirs
import ffmpeg
from model.model_functions import break_into_sentences, load_segmentation_model, load_sentence_encoder, run_segmentation
from model.transcript_functions import upload_audio,save_transcript
from model.model_functions import read_text

def convert_to_timestamp(millis):
  millis = int(millis)
  seconds=(millis/1000)%60
  seconds = int(seconds)
  minutes=(millis/(1000*60))%60
  minutes = int(minutes)
  hours=int((millis/(1000*60*60))%24)

  return hours,minutes,seconds


# @params1: sentences - all sentences (list of sentences)
# @params2: transcript (assemblyai ka output)
# returns: list of start timetamps of every sentence

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
      
      # print ("%d:%d:%d" % (hours, minutes, seconds))
      
    transcript_start += len(sentence_words)
  return timestamps
    
# get_timestamps(["Father they're all talking about here.","Are you ready? Not yet","Okay, ready, godfather?","I'm ready.", "Are you ready?","I'm ready."],transcript)
class UploadCompleteController(Resource):
  
    def post(self):
        fileGuid = request.args['fileGuid'].split(".")[0]
        fileNameExt = request.args['fileName']
        fileName = fileNameExt.split(".")[0]
        dirPath = f'./chunks/{fileGuid}'
        videoDirPath = f'./videos/{fileName}'
        for chunkName in os.listdir(dirPath):
            with open(os.path.join(dirPath, chunkName), 'rb') as chunkF:
                if not path.isdir(videoDirPath):
                    makedirs(videoDirPath)
                with open(f'{videoDirPath}/{fileNameExt}', 'ab') as f:
                    f.write(chunkF.read())
        shutil.rmtree(dirPath, ignore_errors=False)


        audioPath = f'{videoDirPath}/{fileName}.wav'

        command2mp3 = f'ffmpeg -i {videoDirPath}/{fileNameExt} {videoDirPath}/{fileName}.mp3'
        command2wav = f'ffmpeg -i {videoDirPath}/{fileName}.mp3 {audioPath}'

        os.system(command2mp3)
        os.system(command2wav)

        audio_url = upload_audio(audioPath)
        data = save_transcript(audio_url=audio_url,save_folder=videoDirPath)
        
        sentences = break_into_sentences(text=data['text'])


        model_path = "./model/lstm-checkpoints-2checkpoint025.pt"

        model = load_segmentation_model(model_path)
        encoder = load_sentence_encoder()

        # input = ["hello todays topic is machine learning", "we will discuss supervised learning","baby kiss me",
        #          "exams are on monday","so we end todays class"]
        # input = read_text("transcript_data.json")

        print(sentences)

        # result will be an array of 0s and 1s. last sentence hamesha 1 hoga islye woh omitted ha.
        result = run_segmentation(model,encoder, sentences)

        
        print(result)

        timestamps = get_timestamps(sentences=sentences,transcript=data)
        print(timestamps)
        # print(data)

        return {"isSuccess" : True}
