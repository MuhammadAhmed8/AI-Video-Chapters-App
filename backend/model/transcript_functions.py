import time
import requests
from config import API_KEY_ASSEMBLYAI
import json


upload_endpoint = 'https://api.assemblyai.com/v2/upload'
transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
filename = '../videos/946c4a3c-441f-48fb-b90a-dde88ae9f7b2+videoplayback/videoplayback.wav'
headers = {'authorization': API_KEY_ASSEMBLYAI}

def upload_audio(filePath):
    def read_file(filePath, chunk_size=5242880):
        with open(filePath, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    upload_response = requests.post(upload_endpoint,
                            headers=headers,
                            data=read_file(filePath))

    audio_url = upload_response.json()['upload_url']
    return audio_url

def transcribe(audio_url):
    json = { "audio_url": audio_url }

    transcript_response = requests.post(transcript_endpoint, json=json, headers=headers)
    job_id = transcript_response.json()['id']
    return job_id


def poll(transcript_id):
    polling_endpoint = transcript_endpoint + '/' + transcript_id
    polling_response = requests.get(polling_endpoint, headers=headers)
    return polling_response.json()

def get_vtt_result(transcript_id):
    endpoint = f"{transcript_endpoint}/{transcript_id}/vtt"
    response = requests.get(endpoint, headers=headers)
    print(response.text)
    return response.text

def get_transcription_result_url(audio_url):
    transcript_id = transcribe(audio_url=audio_url)
    while True:
        data = poll(transcript_id=transcript_id)
        if data['status'] == 'completed':
            vtt = get_vtt_result(transcript_id=transcript_id)
            return data , vtt , None
        elif data['status'] == 'error':
            return data, vtt, data['error']
        print("Waiting for 30 seconds")
        time.sleep(30)


def save_transcript(audio_url, save_folder):
    data, vtt, error =  get_transcription_result_url(audio_url)

    if data:
        with open(f'{save_folder}/transcript_data.json', 'w') as f:
            # f.write(str(data))
            json.dump(data, f)
        
        # with open(f'{save_folder}/transcript.txt',"w") as f:
        #     f.write(vtt)

        print("Transcription saved!!")
        return data
    elif error:
        print("Error!!", error)

    
# audio_url = upload_audio(filename)
# data = save_transcript(audio_url=audio_url,save_folder='./folder')


