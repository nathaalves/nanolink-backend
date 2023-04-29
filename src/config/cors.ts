export const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? JSON.parse(process.env.ALLOWED_ORIGINS || '[]')
    : [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
      ];

export const options = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credential: true,
};
