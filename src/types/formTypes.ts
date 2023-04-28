import { z } from 'zod';

import { loginValidation, uploadTrackValidation } from 'utils';

import type { FieldValues, SubmitHandler } from 'react-hook-form';
import type { ZodSchema } from 'zod';

export type TAuthForm = z.infer<typeof loginValidation>;
export type TUploadForm = z.infer<typeof uploadTrackValidation>;
export interface IFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  validation: ZodSchema<T>;
}
