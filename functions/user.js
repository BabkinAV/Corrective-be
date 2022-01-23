const { admin, db } = require('./util/admin');

exports.createUser = (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName,
  };

  admin.auth()
    .createUser(newUser)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      // return res.json({message: `Successfully created new user: ${userRecord.uid}`});
      return admin.auth().createCustomToken(userRecord.uid);
    })
    .then((customToken) => {
      return res.status(201).json({ customToken });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: 'something went wrong' });
    });
};
