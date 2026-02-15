from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question')
    notebook_name = data.get('notebook_name')
    
    if not question or not notebook_name:
        return jsonify({"error": "Missing question or notebook_name"}), 400
    
    try:
        # Assuming nlm is in the path and command structure is: nlm query "notebook_name" "question"
        # The user requested: Update the nlm query command to use the variable notebook_name 
        cmd = ["nlm", "query", notebook_name, question]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        response = result.stdout.strip()
        
        if not response:
            response = "I couldn't find a specific answer in that notebook. Could you rephrase your question?"
            
        return jsonify({"response": response})
    except subprocess.CalledProcessError as e:
        print(f"Error running nlm: {e.stderr}")
        return jsonify({"error": "Failed to query notebook", "details": e.stderr}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Using 5001 to avoid potential conflicts with AirPlay or other services on default 5000
    app.run(port=5001, debug=True)
