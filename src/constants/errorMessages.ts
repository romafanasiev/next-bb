export const errorMessages = {
  requiredField: 'Field is required',
  maximumLength: 'Maximum 32 symbols',
  passwordFormat: 'Password doesn’t meet minimal requirements',
  connectionErr: 'Connection problem',
  signUpErr: 'User already exist',
  logInErr: 'The email or password is incorrect',
  emailFormat: 'Incorrect email format',
  thumbnailFormat: 'Only .jpg, .jpeg, .png and .webp formats are supported',
  audioFormat: 'Only .wav, and .mp3 formats are supported',
  requiredFile: 'File is required',
  digitsErr: 'Please use only digits',
  tagsErr: 'Please use only lower case letters and , separator',
  priceErr: 'Please use only digits and . separator',
  languageErr: 'Please use only English letters',
  unexpected: 'Unexpected error',
  musicKey: 'Invalid music key',
  archiveFormat: 'Invalid archive format'
} as const;
