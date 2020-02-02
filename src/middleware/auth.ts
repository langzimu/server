import jwt from 'jsonwebtoken';

// Types
import { Request, Response, NextFunction } from 'express';

// Tools
import logger from '../tools/logger';

// Models
import { MEMB_INFO } from '../db/models';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('nyxAuthToken');

    if (!token) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const userCheck = await MEMB_INFO.count({
      where: {
        memb___id: decode.username,
        jwt_token: token
      }
    });

    if (!userCheck) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    req.username = decode.username;
    next();
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
