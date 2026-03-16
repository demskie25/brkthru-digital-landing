import fs from 'fs';
import path from 'path';

// ==========================================
// INSTRUCTIONS:
// 1. Install 'form-data' if not installed:
//    npm install form-data node-fetch
// 2. Add your OpenAI API Key below
// 3. Set the path to your audio file below
// 4. Run: node transcribe.js
// ==========================================

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; 
const AUDIO_FILE_PATH = path.join(process.cwd(), 'your-audio-file.mp3');

import FormData from 'form-data';
import fetch from 'node-fetch';

async function transcribeAudio() {
    if (!fs.existsSync(AUDIO_FILE_PATH)) {
        console.error(`Error: File not found at ${AUDIO_FILE_PATH}`);
        return;
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(AUDIO_FILE_PATH));
    formData.append('model', 'whisper-1');

    console.log('Sending audio to OpenAI Whisper API...');

    try {
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            console.log('\n✅ Transcription Result:\n');
            console.log(data.text);
            
            // Optionally save to file
            fs.writeFileSync('transcription_output.txt', data.text);
            console.log('\n💾 Saved to transcription_output.txt');
        } else {
            console.error('\n❌ Error from API:', data.error.message);
        }
    } catch (error) {
        console.error('\n❌ Request failed:', error.message);
    }
}

transcribeAudio();
