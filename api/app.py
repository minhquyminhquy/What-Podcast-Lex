from flask import Flask, jsonify, request
from flask_cors import CORS
from data_preprocessing import load_and_preprocess, create_search_pipeline
from data_preprocessing import search_episodes

app = Flask(__name__)
CORS(app)

# Load data and create TF-IDF pipeline
episodes = load_and_preprocess('podcasts.json')
vectorizer, tfidf_matrix = create_search_pipeline(episodes)

@app.route('/search')
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    results = []
    for episode in search_episodes(query, vectorizer, tfidf_matrix, episodes):
        results.append({
            'title': episode['title'],
            'url': episode['url'],
            'description': episode['description'][:200] + '...'  # Truncate description
        })
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

