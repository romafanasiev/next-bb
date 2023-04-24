export const regExp = {
  onlyEnglishLetters: /^[a-zA-Z]+$/,
  password:
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  uppercase: /(?=.*[A-Z]){1}/,
  lowercase: /(?=.*[a-z]){1}/,
  digit: /(?=.*\d)/,
  specialChar: /(?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}/,
  lettersAndSeparator: /^[a-z\s]+(?:,[a-z\s]+)*$/,
};
