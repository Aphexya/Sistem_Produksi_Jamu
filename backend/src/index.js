require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: izinkan frontend dev-server dengan credentials (cookie)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // wajib agar browser mau kirim/terima cookie
}));

app.use(express.json());
app.use(cookieParser()); // parse cookie dari setiap request

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
