import json
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def load_and_preprocess(json_path):
    with open(json_path) as f:
        episodes = json.load(f)
    
    # Clean descriptions
    for episode in episodes:
        # Remove timestamps and podcast links
        cleaned_desc = re.sub(r'\d+:\d+\s+-.*\n', '', episode['description'])
        cleaned_desc = re.sub(r'\*PODCAST LINKS:.*', '', cleaned_desc, flags=re.DOTALL)
        
        # Combine title and cleaned description
        episode['combined_text'] = f"{episode['title']}. {cleaned_desc}"
    
    return episodes

def create_search_pipeline(episodes):
    texts = [ep['combined_text'] for ep in episodes]
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(texts)
    return vectorizer, tfidf_matrix

def search_episodes(query, vectorizer, tfidf_matrix, episodes, top_k=5):
    query_vec = vectorizer.transform([query])
    cos_sim = cosine_similarity(query_vec, tfidf_matrix).flatten()
    sorted_indices = cos_sim.argsort()[::-1][:top_k]
    return [episodes[i] for i in sorted_indices]