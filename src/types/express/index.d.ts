export {};

declare global {
  namespace Express {
    interface Request {
      user_id: number;
      auth_type:number;
    }
  }
}