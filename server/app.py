from flask import Flask, request, render_template, flash, redirect, url_for, jsonify
import os
import PyPDF2

app = Flask(__name__)
app.secret_key = os.environ.get("OPENAI_API_KEY"),

ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_file_size(file_size):
    return file_size <= MAX_FILE_SIZE

def check_for_drawbacks(file_path):
    drawbacks_keywords = ['limitation', 'drawback', 'challenge', 'shortcoming']

    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page_num].extract_text()

    for keyword in drawbacks_keywords:
        if keyword.lower() in text.lower():
            return True

    return False

@app.route('/limitation', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            # flash('No file part')
            # return redirect(request.url)
            return jsonify({'status':'OK', 'error':'No file part'})

        file = request.files['file']

        if file.filename == '':
            # flash('No selected file')
            return jsonify({'status':'OK', 'error':'No file part'})

        if not allowed_file(file.filename):
            # flash('Invalid file extension. Only PDF files are allowed.')
            # return redirect(request.url)
            return jsonify({'status':'OK', 'error':'Invalid file extension. Only PDF files are allowed.'})

        if not allowed_file_size(len(request.data)):
            # flash('File size exceeds the allowed limit (10 MB).')
            return jsonify({'status':'OK', 'error':'File size exceeds the allowed limit (10 MB).'})
            # return redirect(request.url)

        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        has_drawbacks = check_for_drawbacks(file_path)

        # return render_template('result.html', has_drawbacks=has_drawbacks)
        return jsonify({'status':'OK', 'has_drawbacks':has_drawbacks})

    return jsonify({'status':'OK', 'error':'No file part'})
    # return render_template('upload.html')

