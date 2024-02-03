from flask import Flask, request, jsonify
import fitz
from flask_cors import CORS  
import xml.etree.ElementTree as ET
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from math import floor

app = Flask(__name__)
CORS(app)
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
            return jsonify({"summary": generated_summary})

if __name__ == '__main__':
    app.run(debug=True)