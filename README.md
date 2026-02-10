# BFHL REST API

Production-ready REST API with two endpoints: **POST /bfhl** and **GET /health**.

## Tech Stack

- Node.js 18+
- Express
- Google Generative AI (Gemini) for AI endpoint

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set:

- `OFFICIAL_EMAIL` – Your Chitkara email (default: your_email@chitkara.edu.in)
- `GEMINI_API_KEY` – Required only for the AI endpoint

## Run Locally

```bash
npm start
```

Or with auto-reload:

```bash
npm run dev
```

Server runs at `http://localhost:3000`.

## API Usage

### 1. GET /health

Health check endpoint.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

**Example:**
```bash
curl http://localhost:3000/health
```

---

### 2. POST /bfhl

Accepts exactly one of: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`.

#### fibonacci
Returns Fibonacci series of length N (starts from 0).

**Request:**
```json
{ "fibonacci": 7 }
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"fibonacci": 7}'
```

---

#### prime
Filters and returns only prime numbers from an array.

**Request:**
```json
{ "prime": [2, 4, 7, 9, 11] }
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"prime": [2, 4, 7, 9, 11]}'
```

---

#### lcm
Computes LCM of all numbers (minimum 2 elements).

**Request:**
```json
{ "lcm": [12, 18, 24] }
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 72
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"lcm": [12, 18, 24]}'
```

---

#### hcf
Computes HCF (GCD) of all numbers (minimum 2 elements).

**Request:**
```json
{ "hcf": [24, 36, 60] }
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 12
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"hcf": [24, 36, 60]}'
```

---

#### AI
Returns a single-word answer using Google Gemini.

**Request:**
```json
{ "AI": "What is the capital city of Maharashtra?" }
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Mumbai"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"AI": "What is the capital city of Maharashtra?"}'
```

**Note:** Requires `GEMINI_API_KEY` in environment variables.

---

## Error Handling

| Condition            | Status | Response                          |
|----------------------|--------|-----------------------------------|
| Invalid/missing key  | 400    | `is_success: false`, error message |
| Invalid type         | 422    | `is_success: false`, error message |
| Empty arrays         | 422    | `is_success: false`, error message |
| Negative N (fib)     | 422    | `is_success: false`, error message |
| AI API failure       | 500    | `is_success: false`, error message |

---

## Deployment

### Vercel

1. Push repository to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables: `OFFICIAL_EMAIL`, `GEMINI_API_KEY`
4. Deploy

### Render / Railway

1. Create new Web Service
2. Connect your repository
3. Set **Start Command:** `npm start`
4. Add environment variables: `PORT`, `OFFICIAL_EMAIL`, `GEMINI_API_KEY`
5. Deploy

---

## Project Structure

```
/src
├── routes/index.js       # Route definitions
├── controllers/          # Request handlers
├── services/             # Business logic (fibonacci, prime, lcm, hcf, AI)
├── utils/                # Constants, response helpers
├── app.js                # Express app
└── server.js             # Server entry
/api
└── index.js              # Vercel serverless entry
```
