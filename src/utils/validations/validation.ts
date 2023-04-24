/* eslint-disable unused-imports/no-unused-vars */
import { z } from 'zod';

import {
  errorMessages,
  formFieldNames,
  regExp,
  supportedFileTypes,
} from '@constants';

const {
  email,
  nickname,
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
  languageErr,
} = errorMessages;

const { images, audio } = supportedFileTypes;

const {
  onlyEnglishLetters,
  password: passRegExp,
  lettersAndSeparator,
} = regExp;

const getFileValidation = (fileTypes: Array<string>, message: string) => {
  if (typeof window === 'object') {
    return z
      .instanceof(File, { message: requiredFile })
      .refine((file) => fileTypes.includes(file.type), message);
  }

  return null;
};

// const imageValidation = z
//   .instanceof(File, { message: requiredFile })
//   .refine((file) => images.includes(file.type), thumbnailFormat);

// const audioValidation = z
//   .instanceof(File, { message: requiredFile })
//   .refine((file) => audio.includes(file.type), audioFormat);

const imageValidation = getFileValidation(images, thumbnailFormat);

const audioValidation = getFileValidation(audio, audioFormat);

const requiredFieldValidation = z
  .string()
  .min(1, { message: requiredField })
  .trim();

const emailValidation = requiredFieldValidation.email({ message: emailFormat });

const nicknameValidation = requiredFieldValidation
  .min(2, { message: 'Please enter minimum 2 symbols' })
  .max(32, maximumLength)
  .regex(onlyEnglishLetters, { message: languageErr });

const passwordValidation = requiredFieldValidation
  .min(8, { message: 'Please enter minimum 8 symbols' })
  .max(32, { message: maximumLength })
  .regex(passRegExp, { message: passErr });

const priceValidation = z.coerce
  .number({ invalid_type_error: priceErr })
  .min(1, { message: 'Minimal value is 1' });

const tagsValidation = requiredFieldValidation.regex(lettersAndSeparator, {
  message: tagsErr,
});

export const signUpValidation = z.object({
  [email]: emailValidation,
  [nickname]: nicknameValidation,
  [password]: passwordValidation,
});

export const loginValidation = z.object({
  [email]: emailValidation,
  [password]: requiredFieldValidation,
});

// export const uploadTrackValidation = z.object({
//   [cover]: z.optional(imageValidation),
//   [preview]: audioValidation,
//   [fullVersion]: audioValidation,
//   [title]: requiredFieldValidation,
//   [bpm]: requiredFieldValidation,
//   [tags]: tagsValidation,
//   [price]: priceValidation,
// });
