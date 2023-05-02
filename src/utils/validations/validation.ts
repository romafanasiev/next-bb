/* eslint-disable max-lines */
import { z } from 'zod';

import {
  errorMessages,
  formFieldNames,
  regExp,
  supportedFileTypes,
  musicKeys,
} from '@constants';

import type { TErrorMessages, TSupportedFiles } from 'types';
import type { ZodType } from 'zod';

const {
  email,
  password,
  cover,
  title,
  bpm,
  tags,
  price,
  preview,
  fullVersion,
  key,
  exclusiveVersion,
} = formFieldNames;

const {
  requiredField,
  maximumLength,
  passwordFormat: passErr,
  emailFormat,
  requiredFile,
  audioFormat,
  thumbnailFormat,
  priceErr,
  tagsErr,
  musicKey,
  archiveFormat,
} = errorMessages;

const { images, audio, archive } = supportedFileTypes;

const { password: passRegExp, lettersAndSeparator } = regExp;

const getFileValidation = (
  filesFormat: TSupportedFiles,
  formatErrMessage: TErrorMessages,
  optional = false,
) => {
  if (!optional) {
    return z
      .any()
      .refine((files) => files?.length === 1, requiredFile)
      .refine(
        (files) => filesFormat.includes(files?.[0]?.type),
        formatErrMessage,
      );
  }

  return z.any().refine((files) => {
    if (files?.length === 0) {
      return true;
    }

    return filesFormat.includes(files?.[0]?.type);
  }, formatErrMessage);
};

const imageValidation = getFileValidation(
  images,
  thumbnailFormat,
) as ZodType<FileList>;

const audioValidation = getFileValidation(
  audio,
  audioFormat,
) as ZodType<FileList>;

const archiveValidation = getFileValidation(
  archive,
  archiveFormat,
) as ZodType<FileList>;

const keyValidation = z
  .string()
  .refine((string) => musicKeys.includes(string), { message: musicKey });

const requiredFieldValidation = z
  .string()
  .min(1, { message: requiredField })
  .trim();

const emailValidation = requiredFieldValidation.email({ message: emailFormat });

const passwordValidation = requiredFieldValidation
  .min(8, { message: 'Please enter minimum 8 symbols' })
  .max(32, { message: maximumLength })
  .regex(passRegExp, { message: passErr });

const numberValidation = z.coerce
  .number({ invalid_type_error: priceErr })
  .min(1, { message: 'Minimal value is 1' });

const tagsValidation = requiredFieldValidation.regex(lettersAndSeparator, {
  message: tagsErr,
});

export const signUpValidation = z.object({
  [email]: emailValidation,
  [password]: passwordValidation,
});

export const loginValidation = z.object({
  [email]: emailValidation,
  [password]: requiredFieldValidation,
});

export const uploadTrackValidation = z.object({
  [cover]: imageValidation,
  [preview]: audioValidation,
  [fullVersion]: audioValidation,
  [title]: requiredFieldValidation,
  [bpm]: numberValidation,
  [tags]: tagsValidation,
  [price]: numberValidation,
  [key]: keyValidation,
  [exclusiveVersion]: archiveValidation,
});
