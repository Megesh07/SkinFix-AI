# SkinFix AI - Deployment Guide

## 🚨 CRITICAL: Model File Management

### ⚠️ DO NOT Commit Model Files to GitHub

The ML model file (`model.safetensors`) is **~350MB** and should **NEVER** be committed to GitHub.

**Why?**

- GitHub has a 100MB file size limit
- Large files bloat repository history
- Slow clone/pull operations
- Wastes bandwidth

**What's Protected:**
✅ `.gitignore` already excludes:

```
ml-models/**/*.safetensors
ml-models/**/*.bin
ml-models/**/*.pt
ml-models/**/*.pth
ml-models/**/*.onnx
```

## 📦 Model Hosting Options

### Option 1: Hugging Face Hub (Recommended for Production)

**Upload your model:**

```bash
# Install Hugging Face CLI
pip install huggingface_hub

# Login
huggingface-cli login

# Upload model
huggingface-cli upload your-username/skinfix-vit ml-models/vit/fine_tuned_vit/
```

**Configure backend:**

```bash
# In backend/.env
VIT_MODEL_PATH=hf://your-username/skinfix-vit
```

**Benefits:**

- ✅ Free hosting
- ✅ Version control for models
- ✅ Fast CDN delivery
- ✅ Easy sharing

### Option 2: Cloud Storage (AWS S3, Google Cloud Storage, Azure Blob)

**AWS S3 Example:**

```bash
# Upload to S3
aws s3 cp ml-models/vit/fine_tuned_vit/model.safetensors s3://your-bucket/models/

# Configure backend
VIT_MODEL_PATH=s3://your-bucket/models/model.safetensors
```

**Google Cloud Storage:**

```bash
gsutil cp ml-models/vit/fine_tuned_vit/model.safetensors gs://your-bucket/models/
```

### Option 3: Docker Volume Mount (For Containerized Deployment)

**docker-compose.yml:**

```yaml
services:
  backend:
    volumes:
      - /path/to/models:/app/models:ro
    environment:
      - VIT_MODEL_PATH=/app/models/model.safetensors
```

### Option 4: Local Development Only

For local development, keep the model in `ml-models/vit/fine_tuned_vit/` but ensure it's gitignored.

**Setup:**

```bash
# Model stays local, not committed
# Backend uses default relative path
# No environment variable needed
```

## 🚀 Deployment Workflows

### For Frontend (Safe to Push Immediately)

```bash
cd frontend
git add .
git commit -m "feat: add frontend application"
git push origin main
```

**Why it's safe:**

- ✅ No ML models
- ✅ No sensitive data
- ✅ Small bundle size
- ✅ Fast deployment

### For Backend (Requires Model Setup First)

**Step 1: Choose Model Hosting**

- Upload model to Hugging Face/S3/GCS

**Step 2: Configure Environment**

```bash
cd backend
cp .env.example .env
# Edit .env and set VIT_MODEL_PATH
```

**Step 3: Test Locally**

```bash
python main.py
# Verify model loads correctly
```

**Step 4: Push to GitHub**

```bash
git add .
git commit -m "feat: add backend API"
git push origin main
```

**Step 5: Deploy**

- Set `VIT_MODEL_PATH` in production environment
- Deploy backend to your hosting platform

## 🔒 Security Checklist

Before pushing to GitHub:

- [ ] `.gitignore` includes ML model patterns
- [ ] `model.safetensors` is NOT in git tracking
- [ ] `.env` file is gitignored (only `.env.example` committed)
- [ ] `SECRET_KEY` is changed from default
- [ ] Model is hosted externally (Hugging Face/S3/etc.)
- [ ] `VIT_MODEL_PATH` is configured in production

## 🐳 Docker Deployment

### Local Development

```bash
# Build and run
docker-compose up --build

# Model should be mounted as volume
# See docker-compose.yml for configuration
```

### Production

**Option 1: Bake model into image (NOT recommended)**

```dockerfile
# DON'T DO THIS - Image will be huge
COPY ml-models/ /app/ml-models/
```

**Option 2: Download at runtime (Recommended)**

```dockerfile
# In Dockerfile
RUN pip install huggingface_hub
ENV VIT_MODEL_PATH=hf://your-username/skinfix-vit
```

**Option 3: Volume mount (Best for Kubernetes/Docker Swarm)**

```yaml
volumes:
  - model-storage:/app/models
```

## 📊 Model Size Comparison

| Storage Method | Size Impact      | Speed      | Cost                |
| -------------- | ---------------- | ---------- | ------------------- |
| Git (❌ Don't) | +350MB per clone | Slow       | Free but wasteful   |
| Hugging Face   | 0MB in repo      | Fast (CDN) | Free                |
| S3/GCS         | 0MB in repo      | Fast       | ~$0.01/month        |
| Docker Volume  | 0MB in image     | Fastest    | Infrastructure cost |

## 🛠️ Environment Variables Reference

### Required for Production

```bash
# Model path (CRITICAL)
VIT_MODEL_PATH=hf://username/model-name

# Flask security
SECRET_KEY=your-production-secret-key

# Ollama (if using)
OLLAMA_URL=https://your-ollama-instance.com/api/generate
```

### Optional

```bash
# Model device (default: cpu)
MODEL_DEVICE=cuda  # If GPU available

# CORS origins
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Upload limits
MAX_CONTENT_LENGTH=16777216
```

## 🧪 Testing Model Loading

**Test script:**

```python
import os
from dotenv import load_dotenv
from safetensors.torch import load_file

load_dotenv()

model_path = os.getenv(
    "VIT_MODEL_PATH",
    "../ml-models/vit/fine_tuned_vit/model.safetensors"
)

print(f"Loading model from: {model_path}")
try:
    weights = load_file(model_path)
    print(f"✅ Model loaded successfully!")
    print(f"   Keys: {len(weights)} tensors")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
```

## 📝 README Instructions for Users

Add this to your README.md:

````markdown
## 🧠 ML Model Setup

The ViT model file is **not included** in this repository due to its size (~350MB).

### For Local Development:

1. Download the model from [Hugging Face](https://huggingface.co/your-username/skinfix-vit)
2. Place it in: `ml-models/vit/fine_tuned_vit/model.safetensors`
3. Run the backend: `cd backend && python main.py`

### For Production:

Set the `VIT_MODEL_PATH` environment variable:

```bash
export VIT_MODEL_PATH=hf://your-username/skinfix-vit
```
````

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

````

## 🎯 Quick Start Checklist

### First-Time Setup

1. **Upload model to Hugging Face**
   ```bash
   huggingface-cli upload username/skinfix-vit ml-models/vit/fine_tuned_vit/
````

2. **Update .env**

   ```bash
   VIT_MODEL_PATH=hf://username/skinfix-vit
   ```

3. **Test locally**

   ```bash
   cd backend && python main.py
   ```

4. **Push to GitHub**

   ```bash
   git add .
   git commit -m "feat: add SkinFix AI application"
   git push
   ```

5. **Deploy**
   - Set environment variables in hosting platform
   - Deploy frontend and backend separately

## 🔄 CI/CD Considerations

### GitHub Actions Example

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt

      - name: Deploy
        env:
          VIT_MODEL_PATH: ${{ secrets.VIT_MODEL_PATH }}
          SECRET_KEY: ${{ secrets.SECRET_KEY }}
        run: |
          # Your deployment commands
```

## ⚡ Performance Tips

1. **Use CDN for model delivery** (Hugging Face provides this)
2. **Cache model in memory** (already implemented)
3. **Use GPU in production** if available (`MODEL_DEVICE=cuda`)
4. **Implement model versioning** for easy rollbacks

## 🆘 Troubleshooting

### "Model file not found"

- Check `VIT_MODEL_PATH` environment variable
- Verify model exists at specified path
- Check file permissions

### "Out of memory"

- Model requires ~2GB RAM
- Use smaller batch sizes
- Consider model quantization

### "Slow model loading"

- Use local cache for Hugging Face models
- Pre-download model in Docker build
- Use faster storage (SSD)

---

**Remember:** Never commit the model file to Git. Always use external hosting for production.
