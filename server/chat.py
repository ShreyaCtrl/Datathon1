# # # from openai import openAI
# # # import config
# # # # Use a pipeline as a high-level helper
# # # # from transformers import pipeline
# # #
# # # # pipe = pipeline("text-generation", model="meta-llama/Llama-2-7b-chat-hf")
# # # # openai.api_key = config.OPENAI_API_KEY
# # # # Load model directly
# # # # from transformers import AutoTokenizer, AutoModelForCausalLM
# # # client = openAI()
# # # # config.OPENAI_API_KEY
# # #
# # # # tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
# # # # model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
# # #
# # # # def chat(input):
# # # #     if input:
# # # #         return pipe(input)[0]['generated_text']
# # #
# # # def chatbot(input):
# # #     if input:
# # #         # messages = [
# # #         #     {'role': 'system', 'content': 'You are an AI specialized in answering questions about research papers.'},
# # #         #     {'role': 'user', 'content': input}
# # #         # ]
# # #         # completion = openai.ChatCompletion.create(
# # #         #     model="gpt-3.5-turbo",
# # #         #     messages=messages
# # #         # )
# # #         # return completion['choices'][0]['message']['content']
# # #         # from openai import OpenAI
# # #
# # #         response = client.chat.completions.create(
# # #             model="gpt-3.5-turbo",
# # #             messages=[
# # #                 {'role': 'system',
# # #                  'content': 'You are an AI specialized in answering questions about research papers.'},
# # #                 {'role': 'user', 'content': input}
# # #             ]
# # #         )
# # #         return response['choices'][0]['message']['content']
# #
# # import openai
# # import config
# #
# # client = openai.OpenAI()
# #
# # def chatbot(input):
# #     if input:
# #         response = client.chat.completions.create(
# #             model="gpt-3.5-turbo",
# #             messages=[
# #                 {'role': 'system',
# #                  'content': 'You are an AI specialized in answering questions about research papers.'},
# #                 {'role': 'user', 'content': input}
# #             ]
# #         )
# #         return response['choices'][0]['message']['content']
#
# import openai
# import config
#
# # Initialize the OpenAI client with the API key from config
# client = openai.ChatCompletion.create(api_key=config.OPENAI_API_KEY)
#
# def chatbot(input):
#     if input:
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {'role': 'system',
#                  'content': 'You are an AI specialized in answering questions about research papers.'},
#                 {'role': 'user', 'content': input}
#             ]
#         )
#         return response['choices'][0]['message']['content']
from flask import Flask, render_template, request, jsonify

load_dotenv()

app = Flask(__name__)

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def chatbot(input):
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

@app.route("/")
def hello():
    return 'Hello, World!'

@app.route('/ask', methods=['POST'])
def ask():
    message = str(request.form['messageText'])
    bot_response = chatbot(message)
    print(bot_response)
    return jsonify({'status':'OK', 'answer':bot_response})

if __name__ == "__main__":
    app.run()


# Initialize the OpenAI client with the API key from the environment
# openai.api_key = os.environ.get("OPENAI_API_KEY")


# from transformers import T5ForConditionalGeneration, T5Tokenizer
#
# def chatbot(user_message):
#     # Load T5 model and tokenizer
#     model_name = "t5-small"
#     tokenizer = T5Tokenizer.from_pretrained(model_name)
#     model = T5ForConditionalGeneration.from_pretrained(model_name)
#
#     # Generate response
#     prompt = f"User: {user_message}\nChatbot:"
#     input_ids = tokenizer.encode(prompt, return_tensors="pt")
#     output = model.generate(input_ids, max_length=50, num_beams=5, no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7)
#
#     # Decode and return the generated response
#     generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
#     return generated_text
#
# # Example usage
# user_input = "Say this is a test"
# response = chatbot(user_input)
# print("Chatbot Response:", response)

