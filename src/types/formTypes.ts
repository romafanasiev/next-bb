import { z } from 'zod';

import { loginValidation } from 'utils';

export type TAuthForm = z.infer<typeof loginValidation>;
