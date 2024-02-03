from flask import Flask, request, jsonify
import fitz
from flask_cors import CORS  
import xml.etree.ElementTree as ET
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from math import floor
import os
from openai import OpenAI
from dotenv import load_dotenv
import spacy
import re

app = Flask(__name__)
CORS(app)
load_dotenv()


nlp = spacy.load("en_core_web_sm")

def extract_and_summarize(pdf_path):
    # Extract text from the PDF
    pdf_document = fitz.open(pdf_path)
    text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        text += page.get_text()

    # Process the text using spaCy
    doc = nlp(text)

    # Extract sentences containing keywords like methodology, algorithm, calculation, etc.
    relevant_sentences = []
    keywords = ["methodology", "algorithm", "calculation", "process"]

    capitalize_next = True  # Flag to capitalize the next letter
    for sentence in doc.sents:
        # Additional filtering to remove unwanted information
        if any(keyword in sentence.text.lower() for keyword in keywords):
            # Remove non-alphanumeric characters, convert to lowercase, and strip
            clean_sentence = re.sub(r'[^a-zA-Z0-9\s]', '', sentence.text).lower().strip()

            # Capitalize the first letter after each period
            if capitalize_next:
                clean_sentence = clean_sentence.capitalize()
                capitalize_next = False

            relevant_sentences.append(clean_sentence)

        # Stop at the next subtitle
        if sentence.text.isupper() and sentence.text.isalpha():
            break

        # Set the flag to capitalize the next letter after a period
        if '.' in sentence.text and 'www.' not in sentence.text:
            capitalize_next = True

    # Return the simplified explanation
    if relevant_sentences:
        simplified_explanation = ". ".join(relevant_sentences)
        return simplified_explanation
    else:
        return "No relevant information found in the PDF."

def filter_unwanted_content(text):
    # Process the text using spaCy
    doc = nlp(text)

    # Define unwanted words or patterns
    unwanted_words = ["tnmt", "jorge", "9798350333923223100", "ieee", "etc"]

    # Remove unwanted words or patterns
    filtered_text = ' '.join(token.text for token in doc if token.text.lower() not in unwanted_words)

    return filtered_text

@app.route('/get_algorithm', methods=['POST'])
def index():
    # if request.method == 'POST':
    pdf_file = request.files.get('pdf_file')
    if not pdf_file:
        return jsonify({"error": "No file provided"})
    if pdf_file:
        pdf_path = os.path.join("uploads", pdf_file.filename)
        pdf_file.save(pdf_path)

        summary = extract_and_summarize(pdf_path)
        filtered_summary = filter_unwanted_content(summary)

        # return render_template('index.html', summary=filtered_summary)
        return jsonify({"status": "OK", "summary": filtered_summary})

def generate_summary(pdf_path):
    doc = fitz.open(pdf_path, filetype="pdf")

    def xml_parser(xml):
        font_blocks = {}
        for block in xml.findall('block'):
            for line in block.findall('line'):
                for font in line.findall('font'):

                    if font_blocks.get(font.get('name'), "NA") == "NA":
                        font_blocks[font.get('name')] = {}

                    if font_blocks[font.get('name')].get(font.get('size'), "NA") == "NA":
                        font_blocks[font.get('name')][font.get('size')] = ''

                    font_blocks[font.get('name')][font.get('size')] = \
                        font_blocks[font.get('name')][font.get('size')] + " "
                    for char in font.findall('char'):
                        try:
                            font_blocks[font.get('name')][font.get('size')] = font_blocks[font.get('name')][
                                font.get('size')] + char.get('c')
                        except Exception as e:
                            pass
        return font_blocks

    def get_paper_text(paper_dictionary):
        fonts = {}
        for page in paper_dictionary:
            for font in page:
                if fonts.get(font, "NA") == "NA":
                    fonts[font] = {}
                for size in page[font]:
                    if fonts[font].get(size, "NA") == "NA":
                        fonts[font][size] = ''
                    try:
                        fonts[font][size] = fonts[font][size] + page[font][size]
                    except Exception as e:
                        print(e)
        return fonts

    def get_main_body(dict_):
        max_ = 0
        for font in dict_:
            for size in dict_[font]:
                if len(dict_[font][size]) > max_:
                    max_ = len(dict_[font][size])

        for font in dict_:
            for size in dict_[font]:
                if len(dict_[font][size]) == max_:
                    return dict_[font][size]

    entire_doc = []
    for page in doc:
        xml = page.get_text("xml")
        text_ = ET.fromstring(xml)
        entire_doc.append(xml_parser(text_))

    paper2 = get_main_body(get_paper_text(entire_doc))
    nltk.download('punkt')
    nltk.download('stopwords')

    stopWords = set(stopwords.words("english"))

    words = word_tokenize(paper2)
    freqTable = dict()
    for word in words:
        word = word.lower()
        if word in stopWords:
            continue
        if word in freqTable:
            freqTable[word] += 1
        else:
            freqTable[word] = 1

    sentences = sent_tokenize(paper2)
    sentenceValue = dict()

    for sentence in sentences:
        for word, freq in freqTable.items():
            if word in sentence.lower():
                if word in sentence.lower():
                    if sentence in sentenceValue:
                        sentenceValue[sentence] += freq
                    else:
                        sentenceValue[sentence] = freq

    sumValues = 0
    for sentence in sentenceValue:
        sumValues += sentenceValue[sentence]

    average = int(sumValues / len(sentenceValue))

    summary = ''

    for sentence in sentences:
        if (sentence in sentenceValue) and (sentenceValue[sentence] > (1.2 * average)):
            summary += " " + sentence

    return summary

@app.route('/generate_summary', methods=['POST'])
def generate_summary_route():
    if request.method == 'POST':
        pdf_file = request.files['pdf_file']

        if pdf_file:
            pdf_path = "uploads/" + pdf_file.filename
            pdf_file.save(pdf_path)

            generated_summary = generate_summary(pdf_path)
            return jsonify({"status": "OK", "summary": generated_summary})

@app.route("/")
def hello():
    return 'Hello, World!'

@app.route('/ask', methods=['POST'])
def ask():
    message = str(request.form['messageText'])
    bot_response = chatbot(message)
    # print(bot_response)
    return jsonify({'status':'OK', 'answer':bot_response})

def chatbot(input):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )
    if input:
        chat_completion = client.chat.completions.create(
            messages=[
                # {
                #     "role": "user",
                #     "content": "You are an AI specialized in answering questions about research papers.",
                # }
                {'role': 'system',
                                 'content': 'You are an AI specialized in answering questions about research papers.'},
                                {'role': 'user', 'content': input}
            ],
            model="gpt-3.5-turbo",
        )
        return chat_completion.choices[0].message.content

if __name__ == '__main__':
    app.run(debug=True)