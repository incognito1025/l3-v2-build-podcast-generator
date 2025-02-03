#**Testing Gemini API**

This document records the tests of the endpoints of the **Podcast Generator API** using **Postman** and **curl**. All tests have passed.

---

## Testing with Postman

### 1. Test the Gemini API
- **Endpoint**: `POST http://localhost:3030/api/test-gemini`
- **Request Body (JSON):**
  ```json
  {
    "userInput": "Hello, this is a test message"
  }
  ```
- **Expected Response:**
  ```json
  {
    "success": true,
    "response": "Hello there! Thank you for reaching out to us."
  }
  ```

### 2. Health Check Route
- **Endpoint**: `GET http://localhost:3030/`
- **Expected Response:**
  ```
  Welcome to the Podcast Generator
  ```

### 3. Generate Podcast (Audio Upload)
- **Endpoint**: `POST http://localhost:3030/api/generate-podcast`
- **Request:** Form-data
  - **Field:** `audio` (upload an audio file)
- **Expected Response (Success):**
  ```json
  {
    "success": true,
    "scriptURL": "url_to_generated_script",
    "script": "...",
    "segments": []
  }
  ```
- **Expected Response (Error):**
  ```json
  {
    "success": false,
    "message": "Gemini API call failed"
  }
  ```

### 4. Generate from Transcript
- **Endpoint**: `POST http://localhost:3030/api/generate-from-transcript`
- **Request Body (JSON):**
  ```json
  {
    "transcript": "This is a sample transcript that needs to be processed"
  }
  ```
- **Expected Response (Success):**
  ```json
  {
    "success": true,
    "script": "...",
    "segments": []
  }
  ```

---

## Testing with curl

### 1. Test the Gemini API
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"userInput": "Hello, this is a test message"}' \
  http://localhost:3030/api/test-gemini
```

### 2. Health Check
```bash
curl http://localhost:3030/
```

### 3. Generate Podcast (Audio Upload)
```bash
curl -X POST \
  -F "audio=@/path/to/your/audiofile.mp3" \
  http://localhost:3030/api/generate-podcast
```

### 4. Generate from Transcript
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"transcript": "This is a sample transcript that needs to be processed"}' \
  http://localhost:3030/api/generate-from-transcript
```

### 5. Test Nonexistent Route
```bash
curl http://localhost:3030/nonexistent-route
```
- **Expected Response:**
  ```
  This is the error page.
  ```

---
