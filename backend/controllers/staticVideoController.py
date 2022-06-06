from flask import send_from_directory
from flask_restful import Resource
import os


class StaticVideoController(Resource):

    def get(self,id):
        print(id)
        dir_path = f'./videos/{id}'
        file_list = os.listdir(dir_path)
        file_name = ''
        for file in file_list:
            if file.endswith('.mp4'):
                file_name = file
        
        return send_from_directory('videos', f'{id}/{file_name}')