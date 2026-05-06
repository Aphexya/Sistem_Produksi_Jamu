const jwt = require('jsonwebtoken');

/**
 * Middleware autentikasi — membaca JWT dari HttpOnly cookie.
 * Token tidak lagi dibaca dari Authorization header.
 */
function authenticate(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Belum login atau sesi habis' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Token tidak valid atau kadaluarsa' });
  }
}

/**
 * Middleware otorisasi berbasis role.
 * Gunakan setelah authenticate().
 * Contoh: router.delete('/', authenticate, authorize('admin'), handler)
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Akses ditolak: role tidak mencukupi' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
