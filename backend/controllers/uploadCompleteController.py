from flask_restful import Resource
from flask import request
import os
class UploadCompleteController(Resource):
  
    def post(self):
        fileGuid = request.args['fileName'].split(".")[0]
        dirPath = f'./chunks/{fileGuid}'
        for chunkName in os.listdir(dirPath):
            with open(os.path.join(dirPath, chunkName), 'rb') as chunkF:
                with open(f'./chunks/{fileGuid}/thevideo.mp4', 'ab') as f:
                    f.write(chunkF.read())
        return {"isSuccess" : True}
