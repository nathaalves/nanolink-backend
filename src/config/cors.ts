export const allowedOrigins: string[] = JSON.parse(
  process.env.ALLOWED_ORIGINS || '[]'
);

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:3000');
}

export const options = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credential: true,
};
