export const buttonColor = 'fill-white';
const buttonSizes = {
  sm: 'h-[12px] w-[12px]',
  medium: 'h-[20px] w-[20px] md:h-[24px] md:w-[24px]',
  big: 'h-[30px] w-[30px] md:h-[38px] md:w-[38px]',
};

export const subButtonStyles = `${buttonColor} + ${buttonSizes.sm} hidden md:block`;
export const playButtonStyles = `${buttonColor} ${buttonSizes.big} rounded-full bg-white fill-black`;
export const skipButtonStyles = `${buttonColor} + ${buttonSizes.medium}`;
export const closeButtonStyles =
  'absolute right-0 top-0 block h-6 w-6 md:right-2 md:top-1';

export const playerWrapperStyles =
  'fixed bottom-0 flex h-[--eq-sm-size] w-full items-center justify-between bg-primary text-white sm:h-[--eq-size]';
export const controlsWrapperStyles =
  'static pr-6 md:absolute md:left-2/4 md:top-2/4 md:translate-x-[-50%] md:translate-y-[-50%] md:pr-0 flex items-center gap-1 md:gap-2';
export const coverWrapperStyles = 'flex items-center gap-4 capitalize';
