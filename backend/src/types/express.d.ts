// types/express.d.ts  — extend Request type
declare namespace Express {
  interface Request {
    admin?: string | jwt.JwtPayload;
  }
}