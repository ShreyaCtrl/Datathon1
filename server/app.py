from flask import jsonify


# ... (previous code remains unchanged)

@app.route('/generate_limit', methods=['POST'])
def generate_limit():
    if request.method == 'POST':
        pdf_file = request.files['pdf_file']

        if pdf_file:
            pdf_path = "uploads/" + pdf_file.filename
            pdf_file.save(pdf_path)

            # Assuming that you have a function named generate_limitation_summary
            limitation_summary = generate_limitation_summary(pdf_path)

            return jsonify({"status": "OK", "limitation_summary": limitation_summary})

    return jsonify({"status": "OK", "error": "No file part"})


def generate_limitation_summary(pdf_path):
    # Extracting and summarizing the content from the PDF
    summary = extract_and_summarize(pdf_path)
    # Generating limitation summary using the chatbot
    limitation_summary = chatbot("What are the limitations of the research?\n" + summary)
    return limitation_summary

if __name__ == '__main__':
    app.run(debug=True)
