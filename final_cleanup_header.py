import os
import re
import sys

HEADER_TEMPLATE = """
    <!-- SVG FILTER REGISTRY -->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="univ-remove-white" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.1 -1.1 -1.1 3 0" />
        </filter>
      </defs>
    </svg>

    <!-- UNIVERSAL HEADER -->
    <nav class="univ-header">
        <div class="univ-container">
            <!-- LOGO -->
            <a href="index.html" class="univ-logo">
                <img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">
                <span class="univ-logo-accent">DIGITAL</span>
            </a>

            <!-- NAV LINKS -->
            <div class="univ-nav">
                <a href="index.html" class="univ-nav-item" id="nav-home">HOME</a>
                <a href="odyssey.html" class="univ-nav-item" id="nav-odyssey">OUR ODYSSEY</a>
                
                <div class="univ-dropdown-container">
                    <a href="corporate.html" class="univ-nav-item" id="nav-corporate">CORPORATE</a>
                    <div class="univ-dropdown-menu">
                        <a href="corporate.html#leadership" class="univ-dropdown-link">Leadership Edge</a>
                        <a href="corporate.html#alignment" class="univ-dropdown-link">Systemic Alignment</a>
                        <a href="corporate.html#excellence" class="univ-dropdown-link">Customer Excellence</a>
                    </div>
                </div>

                <div class="univ-dropdown-container">
                    <a href="coaching.html" class="univ-nav-item" id="nav-coaching">COACHING</a>
                    <div class="univ-dropdown-menu">
                        <a href="coaching.html#executive" class="univ-dropdown-link">Executive Coaching</a>
                        <a href="coaching.html#sports" class="univ-dropdown-link">Sports Performance</a>
                        <a href="coaching.html#adhd" class="univ-dropdown-link">ADHD & Resilience</a>
                        <a href="coaching.html#relationships" class="univ-dropdown-link">Relationships</a>
                        <a href="coaching.html#career" class="univ-dropdown-link">Career Direction & Transition</a>
                    </div>
                </div>

                <a href="resources.html" class="univ-nav-item" id="nav-resources">RESOURCES</a>
                <a href="shop.html" class="univ-nav-item" id="nav-shop">SHOP</a>
            </div>

            <!-- UTILITY -->
            <div class="univ-utility">
                <a href="javascript:void(0)" onclick="window.open('https://youtu.be/ICr8WGQbpjc', '_blank')" class="univ-btn-video">WATCH LOVE'S VIDEO</a>
                <div class="univ-currency">
                    <span class="active">USD</span> | <span>PHP</span>
                </div>
                <a href="index.html#tour" class="univ-btn-tour">TOUR 2026</a>
            </div>
        </div>
    </nav>
    <div class="univ-spacer"></div>
    <!-- END UNIVERSAL HEADER -->
"""

def clean_file(file_path):
    print(f"Processing {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Regex for universal header block
        header_regex = re.compile(r'<!-- UNIVERSAL HEADER -->[\s\S]*?<!-- END UNIVERSAL HEADER -->', re.IGNORECASE)
        # Regex for SVG registry block
        svg_regex = re.compile(r'<!-- SVG FILTER REGISTRY -->\s*<svg[^>]*>[\s\S]*?</svg>', re.IGNORECASE)

        # Remove all instances
        while header_regex.search(content):
            content = header_regex.sub('', content)
            print(f"  Removed a header block in {file_path}")
            
        while svg_regex.search(content):
            content = svg_regex.sub('', content)
            print(f"  Removed an SVG block in {file_path}")

        # Insert one fresh copy after <body> tag
        body_match = re.search(r'<body[^>]*>', content, re.IGNORECASE)
        if body_match:
            body_end = body_match.end()
            new_content = content[:body_end] + "\n" + HEADER_TEMPLATE + "\n" + content[body_end:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  Successfully updated {file_path}")
        else:
            print(f"  WARNING: Could not find <body> tag in {file_path}")
    except Exception as e:
        print(f"  ERROR processing {file_path}: {str(e)}")

files = [
    'index.html', 'odyssey.html', 'corporate.html', 
    'coaching.html', 'resources.html', 'shop.html'
]

for f in files:
    if os.path.exists(f):
        clean_file(f)
    else:
        print(f"File not found: {f}")

sys.exit(0)
