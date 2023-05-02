import {
  formFieldNames,
  errorMessages,
  supportedFileTypes,
  routes,
} from '@constants';

export type TFieldNames = (typeof formFieldNames)[keyof typeof formFieldNames];
export type TErrorMessages = (typeof errorMessages)[keyof typeof errorMessages];
export type TSupportedFiles =
  (typeof supportedFileTypes)[keyof typeof supportedFileTypes];
export type TAdminRoutes = (typeof routes.admin)[keyof typeof routes.admin];
export type TUserRoutes =(typeof routes.users)[keyof typeof routes.users];
export type TDefaultRoutes = (typeof routes.default)[keyof typeof routes.default]

