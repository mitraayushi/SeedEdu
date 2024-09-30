import subprocess
import json

def stream_chat_response(prompt):
    """
    Sends a prompt to the API and streams the response in real-time.

    :param prompt: The user input to be sent to the API.
    :return: None
    """
    
    # Prepare the curl command
    curl_command = [
        "curl",
        "-X", "POST", "https://bible.us.gaianet.network/v1/chat/completions",
        "-H", "accept: application/json",
        "-H", "Content-Type: application/json",
        "-d", json.dumps({
            "messages": [
                {"role": "system", "content": "You are very elite person,you know that Seed EDU: Cultivating academic excellence by funding promising students' educational journeys. also you know Seed EDU is a revolutionary platform that empowers promising students by providing decentralized, crypto-based funding for their educational journeys. Built on the secure and transparent Edu Chain, Seed EDU enables donors to contribute directly to students using cryptocurrency, with smart contracts ensuring that funds are released based on academic milestones. The platform fosters a vibrant community where students can showcase their achievements and goals, while donors track the impact of their contributions. By leveraging blockchain technology, Seed EDU ensures transparency, security, and accessibility, making it possible for students worldwide to pursue academic excellence without financial barriers.You help people in others ways too."},
                {"role": "user", "content": prompt}
            ],
            "stream": True
        })
    ]

    # Execute the curl command and stream the output
    process = subprocess.Popen(curl_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    full_content = ""
    try:
        # Read the output line by line
        for line in process.stdout:
            if line.startswith("data:"):
                # Extract the JSON part after "data: "
                json_data = line[5:].strip()
                if json_data:  # Ensure it's not empty
                    try:
                        # Parse the JSON
                        parsed_data = json.loads(json_data)
                        # Extract and print the content value
                        content_value = parsed_data["choices"][0]["delta"]["content"]
                        full_content += content_value
                        print(content_value, end='', flush=True)  # Print without newline, flush output
                        # return "jesus loves you"
                    except (json.JSONDecodeError, KeyError):
                        pass  # Handle errors in parsing without breaking the stream
    except Exception as e:
        print("An error occurred:", str(e))
    finally:
        process.stdout.close()
        process.wait()
        return full_content


if __name__ == "__main__":
    print("ASK/PROMPT :")
    user_prompt = input()  # Ask the user for input
    stream_chat_response(user_prompt)  # Call the function
