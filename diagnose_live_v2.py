import urllib.request
import ssl

context = ssl._create_unverified_context()

def check_url(url):
    print(f"\n--- Checking: {url} ---")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=context) as response:
            print(f"Status: {response.status}")
            print(f"Headers: {dict(response.info())}")
            if "text/html" in response.info().get("Content-Type", ""):
                body = response.read().decode('utf-8', errors='ignore')
                print(f"Body snippet (first 500 chars): {body[:500]}")
                print(f"Logo search: {'brkthru-logo' in body}")
                if 'brkthru-logo' in body:
                    start = body.find('brkthru-logo')
                    print(f"Found at: ...{body[max(0, start-50):start+50]}...")
            else:
                print("Non-HTML content (likely binary asset)")
    except Exception as e:
        print(f"FAILED: {e}")

check_url("https://brkthrucoaching.com/odyssey")
check_url("https://brkthrucoaching.com/brkthru-logo.png")
check_url("https://brkthrucoaching.com/images/brkthru-logo.png")
check_url("https://brkthrucoaching.com/universal-header.css")
