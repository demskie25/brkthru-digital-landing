const fs = require('fs');
const problems = [
  {"path":"e:\\brkthru-digital-landing\\checkout.html","message":"'backdrop-filter' is not supported","severity":"error","startLine":19,"endLine":19},
  {"path":"e:\\brkthru-digital-landing\\corporate.html","message":"'backdrop-filter'","severity":"error","startLine":51,"endLine":51},
  {"path":"e:\\brkthru-digital-landing\\corporate.html","message":"'backdrop-filter'","severity":"error","startLine":111,"endLine":111},
  {"path":"e:\\brkthru-digital-landing\\enneagram-gateway.html","message":"'backdrop-filter'","severity":"error","startLine":10,"endLine":10},
  {"path":"e:\\brkthru-digital-landing\\notebooklm_chat.css","message":"'backdrop-filter'","severity":"error","startLine":38,"endLine":38},
  {"path":"e:\\brkthru-digital-landing\\notebooklm_chat.css","message":"'backdrop-filter'","severity":"error","startLine":39,"endLine":39},
  {"path":"e:\\brkthru-digital-landing\\odyssey.html","message":"'backdrop-filter'","severity":"error","startLine":50,"endLine":50},
  {"path":"e:\\brkthru-digital-landing\\public\\checkout.html","message":"'backdrop-filter'","severity":"error","startLine":19,"endLine":19},
  {"path":"e:\\brkthru-digital-landing\\reservations.html","message":"'backdrop-filter'","severity":"error","startLine":32,"endLine":32},
  {"path":"e:\\brkthru-digital-landing\\tour.html","message":"'backdrop-filter'","severity":"error","startLine":48,"endLine":48},
  {"path":"e:\\brkthru-digital-landing\\v2_style.css","message":"'backdrop-filter'","severity":"error","startLine":65,"endLine":65},
  {"path":"e:\\brkthru-digital-landing\\v2_style.css","message":"'backdrop-filter'","severity":"error","startLine":66,"endLine":66},
  {"path":"e:\\brkthru-digital-landing\\v2_style.css","message":"'backdrop-filter'","severity":"error","startLine":268,"endLine":268},
  {"path":"e:\\brkthru-digital-landing\\v2_style.css","message":"'backdrop-filter'","severity":"error","startLine":379,"endLine":379},
  {"path":"e:\\brkthru-digital-landing\\live_check3.html","message":"page-page-break-before","severity":"warning","startLine":50,"endLine":50},
  {"path":"e:\\brkthru-digital-landing\\live_check3.html","message":"page-page-break-before","severity":"warning","startLine":56,"endLine":56},
  {"path":"e:\\brkthru-digital-landing\\live_check3.html","message":"page-page-break-before","severity":"warning","startLine":59,"endLine":59},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":135,"endLine":135},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":141,"endLine":141},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":145,"endLine":145},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":268,"endLine":268},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":751,"endLine":751},
  {"path":"e:\\brkthru-digital-landing\\start-enneagram.html","message":"page-page-break-before","severity":"warning","startLine":810,"endLine":810},
  {"path":"e:\\brkthru-digital-landing\\reservations.html","message":"Select element must have an accessible name","severity":"error","startLine":223,"endLine":223},
  {"path":"e:\\brkthru-digital-landing\\tour.html","message":"Select element must have an accessible name","severity":"error","startLine":843,"endLine":843},
  {"path":"e:\\brkthru-digital-landing\\tour.html","message":"Select element must have an accessible name","severity":"error","startLine":889,"endLine":889},
  {"path":"e:\\brkthru-digital-landing\\tour.html","message":"Select element must have an accessible name","severity":"error","startLine":924,"endLine":924},
  {"path":"e:\\brkthru-digital-landing\\tour.html","message":"-webkit-background-clip","severity":"warning","startLine":54,"endLine":54},
  {"path":"e:\\brkthru-digital-landing\\v2_style.css","message":"-webkit-background-clip","severity":"warning","startLine":80,"endLine":80},
];

let files = [...new Set(problems.map(p => p.path))];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let lines = content.split('\n');
    let modified = false;

    problems.filter(p => p.path === file).forEach(p => {
      let lineIdx = p.startLine - 1;
      let line = lines[lineIdx];
      if (line === undefined) return;
      
      if (p.message.includes('backdrop-filter') && !line.includes('-webkit-backdrop-filter')) {
        lines[lineIdx] = line.replace(/backdrop-filter:\s*([^;]+);/g, '-webkit-backdrop-filter: $1; backdrop-filter: $1;');
        modified = true;
      }
      if (p.message.includes('page-page-break-before')) {
        lines[lineIdx] = line.replace(/page-page-break-before/g, 'page-break-before');
        modified = true;
      }
      if (p.message.includes('accessible name') && line.includes('<select') && !line.includes('title=')) {
        lines[lineIdx] = line.replace(/<select/g, '<select title="Select an option"');
        modified = true;
      }
      if (p.message.includes('-webkit-background-clip') && !line.includes('-webkit-background-clip')) {
        lines[lineIdx] = line.replace(/background-clip:\s*([^;]+);/g, '-webkit-background-clip: $1; background-clip: $1;');
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(file, lines.join('\n'));
      console.log('Fixed simple errors in', file);
    }
  }
});
