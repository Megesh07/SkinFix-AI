# SkinFix AI - API Documentation

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: Configure via environment variables

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User

```http
POST /api/register
```

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "userType": "client"
}
```

**Response** (200 OK):

```json
{
  "status": "success",
  "message": "Registration successful"
}
```

**Error** (400 Bad Request):

```json
{
  "status": "error",
  "message": "Email already registered"
}
```

---

#### Login

```http
POST /api/login
```

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response** (200 OK):

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "userType": "client"
  }
}
```

**Error** (401 Unauthorized):

```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

---

### Chat & AI Analysis

#### Send Chat Message

```http
POST /api/chat
```

**Content-Type**: `multipart/form-data`

**Request Body**:

- `message` (string, optional): Text message
- `image` (file, optional): Image file (PNG, JPG, JPEG, GIF)

**Response** (200 OK):

```json
{
  "status": "success",
  "response": "Detected skin condition: Acne and Rosacea Photos (Confidence: 87.45%)\n\nAdditional advice: Maintain a gentle skincare routine...",
  "imagePath": "/Uploads/20260209_192345_image.jpg"
}
```

**Error** (400 Bad Request):

```json
{
  "status": "error",
  "message": "Invalid file type"
}
```

**Error** (500 Internal Server Error):

```json
{
  "status": "error",
  "message": "Failed to process image"
}
```

---

### Consultations

#### Get User Consultations

```http
GET /api/consultations
```

**Headers**:

```
Authorization: Bearer <token>
```

**Response** (200 OK):

```json
{
  "status": "success",
  "consultations": []
}
```

**Error** (401 Unauthorized):

```json
{
  "status": "error",
  "message": "Token is missing"
}
```

---

### File Serving

#### Get Uploaded Image

```http
GET /Uploads/<filename>
```

**Example**:

```
GET /Uploads/20260209_192345_image.jpg
```

**Response**: Image file (binary)

---

## Data Models

### User

```typescript
interface User {
  name: string;
  email: string;
  password: string; // Hashed
  user_type: "client" | "dermatologist";
}
```

### Chat Message

```typescript
interface ChatMessage {
  message?: string;
  image?: File;
}
```

### Chat Response

```typescript
interface ChatResponse {
  status: "success" | "error";
  response?: string;
  imagePath?: string;
  message?: string; // Error message
}
```

## Error Codes

| Code | Description                          |
| ---- | ------------------------------------ |
| 200  | Success                              |
| 400  | Bad Request (invalid input)          |
| 401  | Unauthorized (missing/invalid token) |
| 500  | Internal Server Error                |

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

## File Upload Limits

- **Max File Size**: 16MB
- **Allowed Types**: PNG, JPG, JPEG, GIF
- **Upload Directory**: `backend/uploads/`

## CORS Configuration

Allowed origins (configurable via environment):

- `http://localhost:3000`
- `http://localhost:5173`

## AI Model Information

### Skin Condition Classes

The ViT model classifies images into 23 DermNet categories:

1. Acne and Rosacea Photos
2. Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions
3. Atopic Dermatitis Photos
4. Bullous Disease Photos
5. Cellulitis Impetigo and other Bacterial Infections
6. Eczema Photos
7. Exanthems and Drug Eruptions
8. Hair Loss Photos Alopecia and other Hair Diseases
9. Herpes HPV and other STDs Photos
10. Light Diseases and Disorders of Pigmentation
11. Lupus and other Connective Tissue diseases
12. Melanoma Skin Cancer Nevi and Moles
13. Nail Fungus and other Nail Disease
14. Poison Ivy Photos and other Contact Dermatitis
15. Psoriasis pictures Lichen Planus and related diseases
16. Scabies Lyme Disease and other Infestations and Bites
17. Seborrheic Keratoses and other Benign Tumors
18. Systemic Disease
19. Tinea Ringworm Candidiasis and other Fungal Infections
20. Urticaria Hives
21. Vascular Tumors
22. Vasculitis Photos
23. Warts Molluscum and other Viral Infections

## Example Usage

### JavaScript/TypeScript (Frontend)

```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:5000/api/login", {
    email,
    password,
  });
  return response.data;
};

// Send chat with image
const sendChat = async (message: string, image: File) => {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("image", image);

  const response = await axios.post(
    "http://localhost:5000/api/chat",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
```

### Python (Backend Testing)

```python
import requests

# Login
response = requests.post('http://localhost:5000/api/login', json={
    'email': 'test@example.com',
    'password': 'password123'
})
token = response.json()['token']

# Send chat
files = {'image': open('skin_image.jpg', 'rb')}
data = {'message': 'What is this condition?'}
headers = {'Authorization': f'Bearer {token}'}

response = requests.post(
    'http://localhost:5000/api/chat',
    files=files,
    data=data,
    headers=headers
)
print(response.json())
```

## Webhooks

Currently not implemented. Future enhancement.

## Versioning

API Version: 1.0.0

No versioning in URLs currently. Consider `/api/v1/` for future versions.
