import json
from nltk.tokenize import sent_tokenize
 
# Opening JSON file

def read_text(filePath):
    text = ""
    with open(filePath) as json_file:
        data = json.load(json_file)
        text = data['text']

    token_text = sent_tokenize(text)
    return token_text