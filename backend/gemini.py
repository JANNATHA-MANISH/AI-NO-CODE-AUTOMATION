import os
import google.generativeai as genai
from dotenv import load_dotenv  


load_dotenv()


genai.configure(api_key=os.environ["GEMINI_API_KEY"])


generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}


model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)


chat_session = model.start_chat(history=[])

def process_with_gemini(input_text: str) -> str:
    
    try:
        
        response = chat_session.send_message(input_text)
        print(response.text)

        
        return response.text
    
    except Exception as e:
        print(f"Error occurred while processing with Gemini: {e}")
        raise ValueError("Sorry, there was an error processing your request.") from e
