from flask import Flask, render_template, request
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# app = Flask(__name__)

# Dummy data for conference ranks
conference_ranks = {
    "Asia Conference on Machine Learning and Computing": 8,
    "Conference B": 5,
    # Add more conferences and their ranks
}

# Download NLTK resources (if not already downloaded)
nltk.download('punkt')
nltk.download('stopwords')

# Preprocess text
def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token.isalpha() and token not in stop_words]
    return tokens

# Calculate similarity between two sets of words
def calculate_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union != 0 else 0
#
# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return render_template('result.html', error="No file part")

    file = request.files['file']

    if file.filename == '':
        return render_template('result.html', error="No selected file")

    conference_name = analyze_paper(file)

    if conference_name:
        rank = conference_ranks.get(conference_name, "N/A")
        return render_template('result.html', conference_name=conference_name, rank=rank)
    else:
        return render_template('result.html', error="Conference name not found")

def analyze_paper(file):
    # Read content from the file in binary mode
    content = file.read()

    # Preprocess the content
    paper_tokens = preprocess_text(content.decode('utf-8', errors='ignore'))

    # Compare with each conference name
    max_similarity = 0
    selected_conference = None

    for conf_name in conference_ranks:
        conf_tokens = preprocess_text(conf_name)
        similarity = calculate_similarity(set(paper_tokens), set(conf_tokens))

        if similarity > max_similarity:
            max_similarity = similarity
            selected_conference = conf_name

    return selected_conference

if __name__ == '__main__':
    app.run(debug=True)
