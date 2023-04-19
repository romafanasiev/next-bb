import { unsetAuthCookies } from 'next-firebase-auth';

import { errorMessages } from '@constants';
import { initAuth } from 'utils';

import type { NextApiRequest, NextApiResponse } from 'next';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: errorMessages.unexpected });
  }

  return res.status(200).json({ success: true });
};

export default handler;

