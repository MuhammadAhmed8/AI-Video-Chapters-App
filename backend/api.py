from flask import Flask
from flask_restful import Api
from controllers.videoDetailsController import VideoDetailsController
from controllers.staticVideoController import StaticVideoController
from controllers.videosDetailsController import VideosDetailsController
from controllers.helloController import HelloController
from controllers.uploadChunksController import UploadChunksController
from controllers.uploadCompleteController import UploadCompleteController
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///static/db/test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


db = SQLAlchemy(app)
# CORS(app)

api.add_resource(HelloController, '/api/hello')
api.add_resource(UploadChunksController, '/api/uploadChunks')
api.add_resource(UploadCompleteController, '/api/uploadComplete')
api.add_resource(VideosDetailsController,'/api/videosDetails')
api.add_resource(StaticVideoController,'/api/staticVideo/<string:id>')
api.add_resource(VideoDetailsController,'/api/videoDetails')

if __name__ == '__main__':
    app.run(debug=True)
