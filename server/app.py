from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Ini akan mengizinkan semua origin secara default, bisa disesuaikan nanti

@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/api/hello')
def hello_world():
    return jsonify(message="Hello from Flask backend!")

mock_services_data = [
    {
        "id": "desain-konten-feed",
        "name": "Konten Feed (Single Post)",
        "prices": { "kaki-lima": 15000, "umkm": 25000, "e-comm": 70000 },
        "tierImages": {
            "kaki-lima": "https://placehold.co/128x128/f8fafc/64748b.png",
            "umkm": "https://placehold.co/128x128/f1f5f9/334155.png",
            "e-comm": "https://placehold.co/128x128/e2e8f0/1e293b.png",
        },
        "image": "https://placehold.co/400x300.png", # Gambar utama produk
        "category": "konten-medsos", # merujuk ke id di mockCategories, cth: 'konten-medsos'
        "dataAiHint": "social media post content",
    },
    {
        "id": "desain-kartu-nama",
        "name": "Kartu Nama",
        "prices": { "kaki-lima": 18000, "umkm": 30000, "e-comm": 70000 },
        "tierImages": {
            "kaki-lima": "https://placehold.co/128x128/f8fafc/64748b.png",
            "umkm": "https://placehold.co/128x128/f1f5f9/334155.png",
            "e-comm": "https://placehold.co/128x128/e2e8f0/1e293b.png",
        },
        "image": "https://placehold.co/400x300.png",
        "category": "branding-kantor",
        "dataAiHint": "business card design",
    },
    {
        "id": "desain-poster-a4",
        "name": "Poster (Ukuran A4)",
        "prices": { "kaki-lima": 22000, "umkm": 50000, "e-comm": 125000 },
        "tierImages": {
            "kaki-lima": "https://placehold.co/128x128/f8fafc/64748b.png",
            "umkm": "https://placehold.co/128x128/f1f5f9/334155.png",
            "e-comm": "https://placehold.co/128x128/e2e8f0/1e293b.png",
        },
        "image": "https://placehold.co/400x300.png",
        "category": "materi-promosi",
        "dataAiHint": "a4 poster design",
    }
]

@app.route('/api/services')
def get_services():
    return jsonify(mock_services_data)

if __name__ == '__main__':
    app.run(debug=True, port=5328) # Port 5328 untuk backend, Next.js biasanya di 3000 atau 9002
