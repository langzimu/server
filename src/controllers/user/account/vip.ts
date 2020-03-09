// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
// import model from '../../../db/models';

const vip = async (req: Request, res: Response) => {
  try {
    res.json({ success: 'here' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default vip;
