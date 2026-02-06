import sys
import os

filepath = 'e:/brkthru-digital-landing/index.html'

try:
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        sys.exit(1)
        
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    
    print(f"Total lines: {len(lines)}")
    
    target_text = 'What Leaders Say About the Book'
    found_idx = -1
    for i, line in enumerate(lines):
        if target_text in line:
            found_idx = i
            print(f"Found target on line {i + 1}")
            break
            
    if found_idx == -1:
        print(f"Target text '{target_text}' not found in file.")
        # Print a few lines around where we expected it (420)
        start = max(0, 410)
        end = min(len(lines), 430)
        for i in range(start, end):
            print(f"{i+1}: {repr(lines[i])}")
        sys.exit(1)
        
    # Content to insert
    new_content = [
        '              <p class="text-[0.6rem] font-black text-amber-500 text-center uppercase tracking-[0.4em] mb-8">Featured Experience & World Class Coach Book Testimonials</p>\n',
        '\n',
        '              <!-- Featured: Love del Rosario -->\n',
        '              <div class="bg-white p-6 md:p-8 rounded-3xl border-2 border-amber-500/30 shadow-2xl relative overflow-hidden group mb-12">\n',
        '                <div class="absolute top-0 right-0 p-4">\n',
        '                  <span class="bg-amber-500 text-white text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Featured Story</span>\n',
        '                </div>\n',
        '                <div class="flex flex-col md:flex-row gap-8 items-start">\n',
        '                  <div class="w-full md:w-1/3">\n',
        '                    <img src="images/brkthru-logo.png" alt="Love del Rosario" class="w-24 h-auto mb-6 opacity-30 grayscale contrast-125">\n',
        '                    <div class="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-slate-100 mb-4 bg-slate-900 flex items-center justify-center relative">\n',
        '                       <a href="https://youtu.be/ICr8WGQbpjc" target="_blank" class="text-white text-center group-hover:scale-110 transition-transform duration-500 z-10">\n',
        '                         <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>\n',
        '                         <span class="text-[0.6rem] font-bold uppercase tracking-widest text-center block px-2">Watch her experience here</span>\n',
        '                       </a>\n',
        '                    </div>\n',
        '                  </div>\n',
        '                  <div class="w-full md:w-2/3">\n',
        '                    <div class="prose prose-slate max-w-none">\n',
        '                      <p class="text-slate-800 font-light text-lg md:text-xl leading-relaxed mb-6">\n',
        '                        When I taught coaching at the Ateneo CCE, i had the privilege of knowing <span class="font-bold text-brand-900">Love del Rosario</span>, then a manager at a multinational company in Manila. Her impressive leadership trajectory brought her to becoming a <span class="font-bold text-brand-900 text-amber-600">Program Manager at the Googleplex</span>, specializing in making big things happen at the highest level of global tech. Her journey is a testament to the power of elite mindset training—moving from leadership roles in Manila to the heart of Silicon Valley.\n',
        '                      </p>\n',
        '                      <p class="text-slate-600 text-sm leading-relaxed mb-6 italic border-l-4 border-amber-500/20 pl-4 bg-slate-50 py-3 rounded-r-lg">\n',
        '                        For over a decade, Google has constantly tussled with Apple for the top spot in the world—with Nvidia well within reach—these 3 in an elite class of being the only companies that have surpassed $4 Trillion.\n',
        '                      </p>\n',
        '                      <p class="text-slate-800 font-light text-lg md:text-xl leading-relaxed mb-8">\n',
        '                        Even as her giant tech company is indispensable to modern life and business, Love knows that the ultimate operating system is the human mind and heart. She uses the <span class="font-bold text-amber-600">World Class Coach framework</span> as her "virtual mentor" to manage stakeholders and lead with strategic precision at the world’s most respected tech giant. <span class="font-medium text-amber-600 underline">Watch her short experience here</span>, and btw this is no paid promotion—there’s no way i can afford a googler!\n',
        '                      </p>\n',
        '                    </div>\n',
        '                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">\n',
        '                       <a href="https://youtu.be/ICr8WGQbpjc" target="_blank" class="inline-flex items-center px-8 py-4 bg-brand-900 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-amber-600 transition-all shadow-xl shadow-brand-900/20 text-xs">\n',
        '                        Watch Love\'s Video\n',
        '                      </a>\n',
        '                      <div class="sm:border-l sm:border-slate-200 sm:pl-4">\n',
        '                        <p class="text-brand-900 font-bold text-base">Love del Rosario</p>\n',
        '                        <p class="text-[0.65rem] text-amber-600 font-bold uppercase tracking-[0.1em]">Program Manager @ Googleplex</p>\n',
        '                      </div>\n',
        '                    </div>\n',
        '                  </div>\n',
        '                </div>\n',
        '              </div>\n'
    ]
    
    lines[found_idx] = "".join(new_content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully updated index.html")
    
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    sys.exit(1)
