import urllib.request
import ssl

def check_url(url):
    print(f"Checking {url}...")
    try:
        context = ssl._create_unverified_context()
        response = urllib.request.urlopen(url, context=context, timeout=10)
        print(f"SUCCESS: {url} returned {response.getcode()}")
        return True
    except Exception as e:
        print(f"FAILED: {url} returned error: {e}")
        return False

urls = [
    'https://brkthrucoaching.com/images/brkthru-logo.png',
    'https://brkthrucoaching.com/odyssey',
    'https://brkthrucoaching.com/',
    'https://brkthrucoaching.com/index.html'
]

results = [check_url(u) for u in urls]
if all(results):
    print("\nALL URLS REACHABLE")
else:
    print("\nSOME URLS FAILED")
