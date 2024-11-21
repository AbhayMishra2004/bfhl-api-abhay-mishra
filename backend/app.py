from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import mimetypes
import os

app = Flask(__name__)
CORS(app)

def is_prime(n):
    if not n.isdigit(): return False
    num = int(n)
    if num < 2: return False
    return all(num % i != 0 for i in range(2, int(num ** 0.5) + 1))

@app.route('/bfhl', methods=['GET', 'POST'])
def handle_bfhl():
    if request.method == 'GET':
        return jsonify({"operation_code": 1}), 200
    
    try:
        data = request.json
        input_array = data.get('data', [])
        file_b64 = data.get('file_b64', '')
        
        numbers = [x for x in input_array if str(x).isdigit()]
        alphabets = [x for x in input_array if str(x).isalpha()]
        highest_lowercase = [max([x for x in alphabets if x.islower()], default='')]
        is_prime_found = any(is_prime(x) for x in numbers)
        
        file_info = process_file(file_b64)
        
        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase,
            "is_prime_found": is_prime_found,
            **file_info
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

def process_file(file_b64):
    if not file_b64:
        return {"file_valid": False}
    
    try:
        file_data = base64.b64decode(file_b64)
        mime_type = mimetypes.guess_type("dummy" + "." + file_b64.split("/")[0])[0]
        file_size = len(file_data) / 1024
        
        return {
            "file_valid": True,
            "file_mime_type": mime_type or "application/octet-stream",
            "file_size_kb": str(round(file_size, 2))
        }
    except:
        return {"file_valid": False}

if __name__ == '__main__':
    app.run(debug=True)
