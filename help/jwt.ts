// import JWT, { SignOptions, VerifyErrors, JwtPayload } from "jsonwebtoken";
// import createError from 'http-errors';
// import { Request, Response, NextFunction } from 'express';



// import '../custom'
// const jwtHelper = {
//   signAccessToken: (data: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const payload = {
//         name: "yours hero",
//       };
//       const secret = process.env.ACCESS_TOKEN_SECRET as string;
//       const options: SignOptions = {
//         expiresIn: "10d",
//         issuer: 'tericsoft',
//         audience: data,
//       };
//       JWT.sign(payload, secret, options, (err, token) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(token as string);
//       });
//     });
//   },

//   verifyAccessToken: (req: Request, res: Response, next: NextFunction): void => {
//     if (!req.headers['authorization']) return next(createError.Unauthorized());
//     const authHeader = req.headers['authorization'];
//     const bearerToken = authHeader.split(' ');
//     const token = bearerToken[1];
//     const secret = process.env.ACCESS_TOKEN_SECRET as string;

//     JWT.verify(token, secret, (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
//       if (err) {
//         const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
//         return next(createError.Unauthorized(message));
//       }
//       req.payload = payload;
//       next();
//     });
//   },

//   signRefreshToken: (data: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const payload = {
//         name: "yours hero",
//       };
//       const secret = process.env.REFRESH_TOKEN_SECRET as string;
//       const options: SignOptions = {
//         expiresIn: "1y",
//         issuer: 'tericsoft',
//         audience: data,
//       };
//       JWT.sign(payload, secret, options, (err, token) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(token as string);
//       });
//     });
//   },

//   verifyRefreshToken: (refreshToken: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const secret = process.env.REFRESH_TOKEN_SECRET as string;

//       JWT.verify(refreshToken, secret, (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
//         if (err) {
//           return reject(createError.Unauthorized());
//         }
//         const phone = payload?.aud as string;
//         resolve(phone);
//       });
//     });
//   }
// };

// export { jwtHelper };

import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

interface Payload {
  name: string;
}

interface JwtHelper {
  signAccessToken: (Phone: string) => Promise<string>;
  verifyAccessToken: (req: Request, res: Response, next: NextFunction) => void;
  signRefreshToken: (Phone: string) => Promise<string>;
  verifyRefreshToken: (refreshToken: string) => Promise<string>;
}

const jwtHelper: JwtHelper = {
  signAccessToken: (Phone: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const payload: Payload = {
        name: "yours hero",
      };
      const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
      const options: JWT.SignOptions = {
        expiresIn: "10d",
        issuer: 'tericsoft',
        audience: Phone,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token as string);
      });
    });
  },

  verifyAccessToken: (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(message));
      }
    //   req.payload = payload;
      next();
    });
  },

  signRefreshToken: (Phone: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const payload: Payload = {
        name: "yours hero",
      };
      const secret: string = process.env.REFRESH_TOKEN_SECRET as string;
      const options: JWT.SignOptions = {
        expiresIn: "1y",
        issuer: 'tericsoft',
        audience: Phone,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token as string);
      });
    });
  },

  verifyRefreshToken: (refreshToken: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }
        const Phone = (payload as JWT.JwtPayload).aud as string;
        resolve(Phone);
      });
    });
  }
};

export { jwtHelper };
