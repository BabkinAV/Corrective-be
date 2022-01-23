const admin = require('firebase-admin');

var serviceAccount = require("./corrective-afe97-firebase-adminsdk-52oyx-18bc8beb26.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {admin, db}