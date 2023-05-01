import { sign, verify } from 'jsonwebtoken';
import { InternalServerError, UnauthorizedError } from '../errors';
import { JWTPayload } from '../types/authTypes';

function getJWTEnvs(type: 'access' | 'refresh') {
  let secretKey: string | undefined;
  let expiresIn: string | undefined;

  if (type === 'access') {
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1d';
  } else {
    secretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
    expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '15d';
  }

  if (!secretKey) {
    throw new InternalServerError(
      'Erro ao gerar token JWT.',
      'Defina uma chave secreta'
    );
  }

  return { secretKey, expiresIn };
}

function generateToken(payload: JWTPayload) {
  const { secretKey, expiresIn } = getJWTEnvs(payload.type);

  return sign(payload, secretKey, { expiresIn });
}

function validateToken(token: string, type: 'access' | 'refresh') {
  const { secretKey } = getJWTEnvs(type);

  const payload = verify(token, secretKey, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError(
        'Não autorizado',
        'O token de acesso ou refresh está expirado ou inválido.'
      );
    }
    return decoded;
  });

  return payload as unknown as JWTPayload;
}

export { generateToken, validateToken };
