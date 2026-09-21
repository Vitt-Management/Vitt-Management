import urllib.request
import os

images = {
    # 1. Vintage magnifying glass on old papers / books
    "service-forgotten-shares.jpg": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    # 2. NRI / Traveler silhouette looking at airport plane window
    "service-nri.jpg": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    # 3. Savings jar / Provident fund / Coins
    "service-pf.jpg": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    # 4. Golden financial asset security / shield / gold coins
    "service-other-assets.jpg": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    # 5. Peace of mind: Person leaning back with hands behind head looking out window
    "peace-of-mind.jpg": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    # 6. Luxury fountain pen on vintage paper
    "old-documents-pen.jpg": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
    # 7. Rajesh Mehta (Mumbai) - Indian businessman portrait
    "client-rajesh.jpg": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    # 8. Priya Sharma (Dubai) - Indian businesswoman portrait
    "client-priya.jpg": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    # 9. Amit Verma (Bengaluru) - Indian tech professional portrait
    "client-amit.jpg": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    # 10. Executive desk with books, coffee mug, succulent
    "cta-desk-mug.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
}

output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in images.items():
    filepath = os.path.join(output_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename} ({os.path.getsize(filepath)} bytes)")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
