import * as functions from 'firebase-functions';

//** Validates data payload of a callable functions */
export const assert = (data: any, key: string) => {
  if (!data[key]) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `function called without ${key} data`,
    );
  } else {
    return data[key];
  }
};

//** Validates auth context for callable function */
export const assertUID = (ctx: any) => {
  if (!ctx.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'function called without context.auth',
    );
  } else {
    return ctx.auth.uid;
  }
};

//** Sends a descriptive error response when running a callable function */
export const catchErrors = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    throw new functions.https.HttpsError('unknown', err as string);
  }
};
