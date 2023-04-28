/* eslint-disable unused-imports/no-unused-vars */
import { z } from 'zod';

import {
  errorMessages,
  formFieldNames,
  regExp,
  supportedFileTypes,
} from '@constants';

import type { TErrorMessages, TSupportedFiles } from 'types';

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
} = errorMessages;

const { images, audio } = supportedFileTypes;

const { password: passRegExp, lettersAndSeparator } = regExp;

const getFileValidation = (
  filesFormat: TSupportedFiles,
  formatErrMessage: TErrorMessages,
) =>
  z
    .any()
    .refine((files) => files.length === 1, requiredFile)
    .refine(
      (files) => filesFormat.includes(files?.[0]?.type),
      formatErrMessage,
    );

const imageValidation = getFileValidation(images, thumbnailFormat);
const audioValidation = getFileValidation(audio, audioFormat);

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
  [cover]: z.optional(imageValidation),
  [preview]: audioValidation,
  [fullVersion]: audioValidation,
  [title]: requiredFieldValidation,
  [bpm]: numberValidation,
  [tags]: tagsValidation,
  [price]: numberValidation,
});
