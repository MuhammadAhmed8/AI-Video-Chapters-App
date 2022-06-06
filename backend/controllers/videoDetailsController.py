import json
from flask import send_from_directory,request
from flask_restful import Resource
import os



class VideoDetailsController(Resource):

    def get(self):
        args = request.args
        print (args) # For debugging
        id = args['id']
        print(id)

        dir_path = f'./videos/{id}'

        file_list = os.listdir(dir_path)
        file_name = ''
        for file in file_list:
            if file.endswith('.mp4'):
                file_name = file
        
        f = open(f'{dir_path}/result.json')
  
        # returns JSON object as 
        # a dictionary
        data = json.load(f)
        
        # return send_from_directory('videos', f'{id}/{file_name}')
        
        return {"result" : {'id':id,'file_name':file_name,'segments':data['segments']}} 