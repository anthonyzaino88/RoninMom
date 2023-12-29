const { onCall } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = onCall(async (data, context) => {
  // Ensure the caller is authorized to assign roles, typically by checking context.auth

  const email = data.email;
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    return { message: `Success! ${email} has been made an admin.` };
  } catch (err) {
    return { error: err.message };
  }
});
