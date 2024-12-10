from gemini import process_with_gemini


def process_pipeline(input_text: str, selected_model: str, file_content: str = None) -> str:
    
    try:
        if file_content:
            combined_input = f"{input_text}\n\nFile Content:\n{file_content}"
        else:
            combined_input = input_text

        if selected_model.lower() == 'gemini':
            return process_with_gemini(combined_input)
        elif selected_model.lower() == 'llama':
            return process_with_llama(combined_input)
        elif selected_model.lower() == 'chatgpt':
            return process_with_chatgpt(combined_input)
        else:
            raise ValueError(f"Unsupported model selected: {selected_model}")
    except Exception as e:
        raise e  
