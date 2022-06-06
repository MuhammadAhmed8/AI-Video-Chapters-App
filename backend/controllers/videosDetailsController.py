from flask import send_from_directory
from flask_restful import Resource
import subprocess
import os
import wave
import contextlib

def get_wav_length(path):
    with contextlib.closing(wave.open(path,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        return duration

def get_length(filename):
    result = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                             "format=duration", "-of",
                             "default=noprint_wrappers=1:nokey=1", filename],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT)
    return float(result.stdout)

class VideosDetailsController(Resource):
    # get files details
    def get(self):
        path =  './videos'
        dir_list = os.listdir(path)
        videos_list = []
        for dir in dir_list:
            dir_path = os.path.join(path,dir)
            file_list = os.listdir(dir_path)
            
            if 'result.json' in file_list:
                status = 'processed'
            else:
                status = 'processing'

            duration = '0'
            file_name = ''
            for file in file_list:
                if file.endswith('.wav'):
                    duration = str(round(get_wav_length(os.path.join(dir_path,file)) / 60)) + ' mins'
                    file_name = file.split('.')[0]
            videos_list.append({'id':dir,'name':file_name,'length':duration,"uploaded":"An hour ago",'status':status})

        return {"result" : videos_list} 


