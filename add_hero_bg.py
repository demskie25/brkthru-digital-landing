import re

# Configuration for each page
pages = {
    'coaching.html': {
        'image': 'hero_coaching.png',
        'find': '<section class="bg-brand-navy py-32 overflow-hidden">',
        'replace': '''<section class="bg-brand-navy py-32 overflow-hidden relative">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img src="hero_coaching.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60"></div>
        </div>'''
    },
    'resources.html': {
        'image': 'hero_resources.png',
        'find': '''<section
      class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
      ></div>''',
        'replace': '''<section
      class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden"
    >
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="hero_resources.png" alt="" class="w-full h-full object-cover opacity-20" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
      </div>
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0"
      ></div>'''
    },
    'shop.html': {
        'image': 'hero_shop.png',
        'find': '''<section class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
      >''',
        'replace': '''<section class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="hero_shop.png" alt="" class="w-full h-full object-cover opacity-20" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
      </div>
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10"
      >'''
    },
    'corporate.html': {
        'image': 'hero_corporate.png',
        'find': '''<div
          class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
        ></div>''',
        'replace': '''<!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img src="hero_corporate.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/50"></div>
        </div>'''
    }
}

for filename, config in pages.items():
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if config['find'] in content:
            content = content.replace(config['find'], config['replace'], 1)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ {filename}: Added hero background")
        else:
            print(f"✗ {filename}: Pattern not found")
    except Exception as e:
        print(f"✗ {filename}: Error - {e}")

print("\nDone!")
