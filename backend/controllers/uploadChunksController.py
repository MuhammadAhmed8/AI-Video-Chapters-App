from importlib.resources import path
from flask_restful import Resource
from flask import request
from os import path, makedirs
class UploadChunksController(Resource):

    def post(self):
        print("received chunk")
        file = request.files['video']
        fileGuid = request.args['fileGuid'].split(".")
        fileName = fileGuid[0]
        fileExt = fileGuid[1]
        chunkId = request.args['id']
        dirPath = f'./chunks/{fileName}'
        if not path.isdir(dirPath):
            makedirs(dirPath)
        file.save(path.join(dirPath,chunkId+f'.{fileExt}'))
        return {"isSuccess" : True}
    
    def get(self):
        return {"response" : "hello get"} 


