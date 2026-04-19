// types/express.d.ts  — extend Request type
declare namespace Express {
  interface Request {
    user?: string | jwt.JwtPayload;
  }
}