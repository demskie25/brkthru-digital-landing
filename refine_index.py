
import os
import re

path = r'e:\brkthru-digital-landing\index.html'

with open(path, 'rb') as f:
    content = f.read()

# Replace replacement characters () which are \xef\xbf\xbd in UTF-8
# and other potential mangled chars
content = content.replace(b'\xef\xbf\xbd', b'')

# Decode to string for easier regex
text = content.decode('utf-8', errors='ignore')

# Fix mangled apostrophes and dashes that often appear after encoding issues
text = text.replace('youre', "you're")
text = text.replace('theyre', "they're")
text = text.replace('youve', "you've")
text = text.replace('theyve', "they've")
text = text.replace('Parents Circle', "Parent's Circle")

# Boost contrast for track descriptions (slate-400 -> slate-300)
# We target the tracks section (lines ~550 to ~800)
# Instead of line numbers, we just do a global replace for these specific utility classes
# but only where they are used for descriptive text.
# However, a global replace for slate-400 to slate-300 is generally safe for this site's dark aesthetic.
text = text.replace('text-slate-400', 'text-slate-300')

# Also boost slate-500 to slate-400 for headers/subtitles
text = text.replace('text-slate-500', 'text-slate-400')

# Fix specific mangled dashes in the parenting section
text = text.replace('transitionfrom', 'transition from')
text = text.replace('bedtimefeels', 'bedtime feels')

# Write back
with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully refined index.html aesthetics and fixed encoding issues.")
