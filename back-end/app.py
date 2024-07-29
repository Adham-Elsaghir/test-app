from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/verify-token', methods=['POST'])
def verify_token():
    data = request.json
    access_token = data.get('accessToken')
    
    if access_token:
        response = requests.get(f'https://graph.facebook.com/me?access_token={access_token}')
        user_info = response.json()
        return jsonify(user_info), 200
    else:
        return jsonify({"error": "Invalid access token"}), 400

@app.route('/save-posts', methods=['POST'])
def save_posts():
    data = request.json
    posts = data.get('posts')

    if posts:
        print("Received posts:", posts)
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"error": "No posts data received"}), 400

if __name__ == '__main__':
    app.run(debug=True)
