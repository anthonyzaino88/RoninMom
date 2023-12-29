const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  const email = data.email;

  return admin.auth().getUserByEmail(email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(() => {
    return {message: `Success! ${email} has been made an admin`};
  }).catch((err) => {
    return err;
  });
});
