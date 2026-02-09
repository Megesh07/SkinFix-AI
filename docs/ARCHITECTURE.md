# SkinFix AI - Architecture Overview

## System Architecture

SkinFix AI follows a modern monorepo architecture with clear separation between frontend, backend, and ML components.

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/REST
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │   Chat   │  │  EMart   │  │  Routine │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ Booking  │  │Dashboard │  │ Settings │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Flask API)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Routes Layer                       │  │
│  │  /api/auth  │  /api/chat  │  /api/consultations     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Services Layer                       │  │
│  │  AI Service  │  Image Service  │  Ollama Service     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Models Layer                        │  │
│  │  User Model  │  Consultation Model                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─────────────┬──────────────┐
                     ▼             ▼              ▼
            ┌────────────┐  ┌───────────┐  ┌──────────┐
            │  ViT Model │  │   Ollama  │  │  Uploads │
            │  (PyTorch) │  │    LLM    │  │  Storage │
            └────────────┘  └───────────┘  └──────────┘
```

## Component Architecture

### Frontend Architecture

**Component Organization** (Feature-based):

```
components/
├── auth/           # Authentication components
├── chat/           # AI chatbot interface
├── emart/          # E-commerce marketplace
├── routine/        # Routine tracker
├── booking/        # Dermatologist booking
├── dashboard/      # User dashboard
├── settings/       # Settings page
└── home/           # Landing page
```

**State Management**:

- React Context API for authentication
- Local Storage for persistence
- Component-level state for UI

**Routing**:

- React Router v6
- Protected routes with authentication
- Lazy loading for code splitting

### Backend Architecture

**Layered Architecture**:

1. **Routes Layer**: HTTP endpoint definitions
2. **Services Layer**: Business logic and AI integration
3. **Models Layer**: Data structures and validation
4. **Utils Layer**: Helper functions and utilities

**API Endpoints**:

```
POST   /api/register          # User registration
POST   /api/login             # User authentication
POST   /api/chat              # AI chat with image analysis
GET    /api/consultations     # Get user consultations
GET    /Uploads/<filename>    # Serve uploaded images
```

### ML/AI Architecture

**Vision Transformer (ViT)**:

- Pre-trained: `google/vit-base-patch16-224`
- Fine-tuned on DermNet dataset
- 23 skin condition classes
- CPU-optimized inference

**Ollama LLM**:

- Custom skincare model
- Conversational AI responses
- Fallback to rule-based responses

**Image Processing Pipeline**:

```
User Upload → Resize (224x224) → Normalize → ViT Model →
Classification → Confidence Score → Ollama Context → Response
```

## Data Flow

### Chat with Image Analysis

```
1. User uploads image + message
2. Frontend sends FormData to /api/chat
3. Backend saves image to uploads/
4. Image preprocessed (resize, normalize)
5. ViT model predicts skin condition
6. Prediction + message sent to Ollama
7. Combined response returned to frontend
8. Frontend displays analysis + advice
```

### Authentication Flow

```
1. User submits credentials
2. Backend validates and generates JWT
3. Token stored in localStorage
4. Token sent in Authorization header
5. Backend validates token on protected routes
6. User data returned if valid
```

## Security

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Werkzeug password hashing
- **CORS**: Configured allowed origins
- **File Validation**: Type and size checks
- **Environment Variables**: Sensitive data in .env

## Scalability Considerations

**Current Limitations**:

- In-memory user storage (no database)
- Single-server deployment
- CPU-only ML inference

**Future Improvements**:

- PostgreSQL/MongoDB for persistence
- Redis for caching
- GPU support for faster inference
- Load balancing for multiple instances
- CDN for static assets

## Technology Stack

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend

- **Framework**: Flask 3.0
- **ML**: PyTorch + Transformers
- **LLM**: Ollama
- **Auth**: PyJWT
- **Image**: Pillow
- **CORS**: Flask-CORS

### DevOps

- **Containerization**: Docker + Docker Compose
- **Testing**: Vitest (Frontend), Pytest (Backend)
- **Version Control**: Git

## Deployment Architecture

### Docker Deployment

```
docker-compose.yml
├── frontend (Nginx)
│   └── Port 3000
├── backend (Flask)
│   └── Port 5000
└── Network: skinfix-network
```

### Production Considerations

1. **Frontend**: Build → Nginx static serving
2. **Backend**: Gunicorn WSGI server
3. **ML Models**: Mounted as read-only volumes
4. **Uploads**: Persistent volume storage
5. **Environment**: Production .env configuration

## Performance Optimization

- **Frontend**: Code splitting, lazy loading
- **Backend**: Model loaded once at startup
- **Caching**: Browser caching for static assets
- **Compression**: Gzip for API responses
- **Image Optimization**: Resize before upload

## Monitoring & Logging

- Flask logging for backend errors
- Console logging for frontend debugging
- Upload tracking for image analysis
- Performance metrics (future enhancement)
