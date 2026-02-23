# Red Cross Lottery API (FastAPI)

A lottery management system built with Python FastAPI, migrating from Node.js/Express.

## Features

- User authentication with JWT tokens
- Lottery number management
- Reward checking with EasyOCR (no API key required)
- RESTful API design
- Database integration with SQLAlchemy ORM
- Docker support

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration settings
├── database.py            # Database connection and session
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── models/               # Database models
│   ├── __init__.py
│   ├── user.py          # User model
│   └── lottery.py       # Lottery model
├── schemas/             # Pydantic schemas
│   ├── __init__.py
│   ├── user.py          # User schemas
│   └── lottery.py       # Lottery schemas
├── routers/             # API route handlers
│   ├── __init__.py
│   ├── user.py          # User routes
│   ├── lottery.py       # Lottery routes
│   └── reward.py        # Reward checking routes
├── middleware/          # Custom middleware
│   ├── __init__.py
│   └── auth.py          # Authentication middleware
└── utils/              # Utility functions
    ├── __init__.py
    ├── auth.py         # JWT token utilities
    ├── password_utils.py # Password hashing utilities
    └── reward_checker.py # Reward checking logic
```

## Setup

### Prerequisites

1. Install UV (recommended package manager):
```bash
# On macOS and Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or with pip
pip install uv
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
MYSQL_DATABASE=your_database
MYSQL_USERNAME=your_username
MYSQL_PASSWORD=your_password
MYSQL_HOST=localhost

# Server
NODE_HOST=localhost
NODE_PORT=8000

# SSL (optional)
SSL_KEY_PATH=path/to/key.pem
SSL_CERT_PATH=path/to/cert.pem

# JWT
JWT_SECRET=your_jwt_secret_key

# OCR Configuration (optional)
OCR_EASYOCR_LANGUAGES=en,th
OCR_MIN_CONFIDENCE=0.5
```

### Installation

1. Install dependencies with UV:
```bash
uv sync
```

2. Run the application:
```bash
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Development Mode

For development with additional tools:
```bash
# Install with dev dependencies
uv sync --dev

# Run in development mode
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Traditional pip installation (alternative)

If you prefer pip over UV:
```bash
pip install -e .
```

### Docker

Build and run with Docker (uses UV for fast dependency management):

```bash
docker build -t redcross-lottery-api .
docker run -d --name redcross-lottery-container -p 8000:8000 --env-file .env redcross-lottery-api
```

Or use the provided script:

```bash
./run_container.sh
```

#### Development with Docker Compose

For development with hot reload:
```bash
docker-compose up --build
```

## API Endpoints

### Users
- `POST /login` - User login
- `POST /register` - User registration
- `GET /users` - Get all users
- `GET /users/{user_id}` - Get user by ID
- `PUT /users/{user_id}` - Update user
- `DELETE /users/{user_id}` - Delete user

### Lotteries
- `POST /lotteries` - Create new lottery
- `GET /lotteries` - Get all lotteries
- `DELETE /lotteries/{lottery_id}` - Delete lottery

### Rewards
- `POST /check-reward` - Upload image to check lottery reward
- `GET /ocr-engines` - Get available OCR engines

## OCR Features

The API uses EasyOCR for text extraction from lottery images:

### EasyOCR
- **No API key required** - works out of the box
- Supports English and Thai languages
- Self-hosted, no external dependencies
- Perfect for development and production

#### Using EasyOCR
EasyOCR handles OCR automatically:

```bash
# Upload image - EasyOCR will process automatically
curl -X POST "http://localhost:8000/check-reward" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@lottery_image.jpg"
```

### OCR Configuration
Add these to your `.env` file to customize OCR behavior:

```env
# OCR Settings
OCR_EASYOCR_LANGUAGES=en,th
OCR_MIN_CONFIDENCE=0.5
```

#### OCR Language Support
- `en` - English
- `th` - Thai
- Can add more languages separated by commas (e.g., `en,th,fr,de`)

#### OCR Confidence Threshold
- `OCR_MIN_CONFIDENCE=0.5` - Minimum confidence score (0.0 to 1.0)
- Higher values increase accuracy but may miss faint text
- Lower values capture more text but may include noise

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Migration from Node.js

This project is a complete migration from the original Node.js/Express backend to Python FastAPI, maintaining:

- Same database schema (MySQL)
- Same API functionality
- Same authentication logic (JWT)
- Same reward checking logic
- EasyOCR integration (no API key required)
- Docker containerization

You can also use docker-compose:
```bash
docker-compose up --build
```