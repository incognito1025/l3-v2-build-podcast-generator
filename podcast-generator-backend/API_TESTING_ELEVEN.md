# **Testing ElevenLabs API**

This document records the ElevenLabs API tests using **cURL** and **Postman**. All tests have passed.

---

## **1. Using cURL**

### **1.1 Get Available Voices**
#### **Request:**
```sh
curl -X GET http://localhost:3030/api/elevenlabs/voices -H "xi-api-key: YOUR_API_KEY"
```

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "voices": [
        {
            "voice_id": "9BWtsMINqrJLrRacOk9x",
            "name": "Aria",
            "samples": null,
            "category": "premade",
            "fine_tuning": {
                "is_allowed_to_fine_tune": true
            }
        }
    ]
}
```

---

### **1.2 Convert Text to Speech**
#### **Request:**
```sh
curl -X POST http://localhost:3030/api/elevenlabs/text-to-speech \
     -H "xi-api-key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello, world!", "voiceId": "9BWtsMINqrJLrRacOk9x"}'
```

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "bufferId": "1738536627047",
    "message": "Text converted to speech successfully"
}
```

❌ **Unsuccessful:**
```json
{
    "error": "ENOENT: no such file or directory, open '/path/to/generated/tts.mp3'"
}
```

---

### **1.3 Get Voice Settings**
#### **Request:**
```sh
curl -X GET http://localhost:3030/api/elevenlabs/voices/9BWtsMINqrJLrRacOk9x/settings -H "xi-api-key: YOUR_API_KEY"
```

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "settings": {
        "stability": 0.5,
        "similarity_boost": 0.75,
        "style": 0,
        "use_speaker_boost": true
    }
}
```

❌ **Unsuccessful:**
```json
{
    "error": "ElevenLabsService.getVoiceSettings is not a function"
}
```

---

## **2. Using Postman**

### **2.1 Setup in Postman**
1. **Open Postman** and create a new request.
2. **Set up headers:**
   - Add a new header: `xi-api-key` → `YOUR_API_KEY`.

---

### **2.2 Get Available Voices**
- **Request URL:** `http://localhost:3030/api/elevenlabs/voices`
- **Request Type:** `GET`
- **Headers:**
  - `xi-api-key: YOUR_API_KEY`
- **Click Send**

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "voices": [
        {
            "voice_id": "9BWtsMINqrJLrRacOk9x",
            "name": "Aria",
            "samples": null,
            "category": "premade",
            "fine_tuning": {
                "is_allowed_to_fine_tune": true
            }
        }
    ]
}
```

---

### **2.3 Convert Text to Speech**
- **Request URL:** `http://localhost:3030/api/elevenlabs/text-to-speech`
- **Request Type:** `POST`
- **Headers:**
  - `xi-api-key: YOUR_API_KEY`
  - `Content-Type: application/json`
- **Body:** (Set to `raw` → JSON format)
```json
{
    "text": "Hello, world!",
    "voiceId": "9BWtsMINqrJLrRacOk9x"
}
```
- **Click Send**

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "bufferId": "1738536953705",
    "message": "Text converted to speech successfully"
}
```

❌ **Unsuccessful:**
```json
{
    "error": "500 Internal Server Error - The server encountered an issue processing the request."
}
```

---

### **2.4 Get Voice Settings**
- **Request URL:** `http://localhost:3030/api/elevenlabs/voices/9BWtsMINqrJLrRacOk9x/settings`
- **Request Type:** `GET`
- **Headers:**
  - `xi-api-key: YOUR_API_KEY`
- **Click Send**

#### **Response:**
✅ **Successful:**
```json
{
    "success": true,
    "settings": {
        "stability": 0.5,
        "similarity_boost": 0.75,
        "style": 0,
        "use_speaker_boost": true
    }
}
```

❌ **Unsuccessful:**
```json
{
    "error": "404 Not Found - This is the error page."
}
```

---

### **Notes:**
- Replace `YOUR_API_KEY` with your actual ElevenLabs API key.
- Ensure the API server is running on `localhost:3030` before making requests.
- If you receive an error, check the server logs for more details.

---

This guide ensures that testing is clear and GitHub-friendly with properly formatted code blocks and structured sections. 🚀

