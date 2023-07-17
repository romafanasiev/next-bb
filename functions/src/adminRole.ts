import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const admins = ['romafanasiev123@gmail.com'];

export const addAdminRole = functions.https.onCall((data) =>
  // get user and add custom claim (admin)
  admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      if (admins.includes(user.email!)) {
        admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
        });
      }
    })
    .then(() => {
      return {
        message: 'Success',
      };
    })
    .catch((e) => e),
);
