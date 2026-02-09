# SkinFix AI - Setup Guide

## System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **Node.js**: 20.x or higher
- **Python**: 3.11 or higher
- **RAM**: Minimum 8GB (16GB recommended for ML model)
- **Storage**: 5GB free space

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd skinfix
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Configuration**:

- No additional configuration needed for development
- For production, set `VITE_API_URL` in environment

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

**Configuration**:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
OLLAMA_URL=http://localhost:11435/api/generate
MODEL_PATH=../ml-models/vit/fine_tuned_vit/model.safetensors
```

### 4. ML Model Setup

The fine-tuned ViT model is already included in `ml-models/vit/fine_tuned_vit/`.

**Verify model files**:

- `model.safetensors`
- `config.json`
- `preprocessor_config.json`

### 5. Ollama Setup (Optional)

For full AI functionality, install Ollama:

```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull the skinfix model
ollama pull hf.co/Sanjay1905/skinfixllama:latest
```

## Running the Application

### Development Mode

**Terminal 1 - Backend**:

```bash
cd backend
python main.py
```

**Terminal 2 - Frontend**:

```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

### Production Build

**Frontend**:

```bash
cd frontend
npm run build
npm run preview
```

**Backend**:

```bash
cd backend
FLASK_ENV=production python main.py
```

## Docker Setup

### Using Docker Compose

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Individual Docker Builds

**Frontend**:

```bash
cd frontend
docker build -t skinfix-frontend .
docker run -p 3000:80 skinfix-frontend
```

**Backend**:

```bash
cd backend
docker build -t skinfix-backend .
docker run -p 5000:5000 skinfix-backend
```

## Troubleshooting

### Common Issues

**1. Module not found errors (Frontend)**

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**2. Python package errors (Backend)**

```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**3. Model loading errors**

- Verify model files exist in `ml-models/vit/fine_tuned_vit/`
- Check `MODEL_PATH` in `.env`
- Ensure sufficient RAM (8GB minimum)

**4. CORS errors**

- Verify `CORS_ORIGINS` in backend `.env`
- Check frontend API URL configuration

**5. Ollama connection errors**

- Ensure Ollama is running: `ollama serve`
- Verify `OLLAMA_URL` in `.env`
- Check if model is pulled: `ollama list`

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
pytest
# or
python -m pytest
```

## Environment Variables

### Frontend

- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000`)

### Backend

- `FLASK_APP`: Entry point (default: `main.py`)
- `FLASK_ENV`: Environment (`development`/`production`)
- `SECRET_KEY`: JWT secret key
- `CORS_ORIGINS`: Allowed origins (comma-separated)
- `MODEL_PATH`: Path to ViT model
- `OLLAMA_URL`: Ollama API endpoint
- `UPLOAD_FOLDER`: Upload directory path

## Next Steps

1. Review [Architecture Documentation](ARCHITECTURE.md)
2. Check [API Documentation](API.md)
3. Read [Deployment Guide](DEPLOYMENT.md)

## Support

For issues or questions, please create an issue in the repository.
