const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unathorized' });
  }

  if (idToken === '123') {return next()} else {
    console.error('Invalid token');
    return res.status(403).json({ error: 'Unathorized' });
  }

  // let email = req.body.email;
  // let password = req.body.password;
  // let token = req.body.customToken;

  // if (idToken === '123') {
  // db.collection('users')
  //   .where('userId', '==', '5swZRkGjbMRLPrPWpYwBN9yJVNI2')
  //   .limit(1)
  //   .get()

  // admin.auth().getUser(uid)
  // .then((userRecord) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   return res.json(userRecord);
  // })
  // .catch((error) => {
  //   console.log('Error fetching user data:', error);
  // });
  // admin
  //   .auth()
  //   .verifyIdToken(token)
  //   .then((decodedToken) => {
  //     const uid = decodedToken.uid;
  //     return res.status(200).json({uid: uid});
  //     // ...
  //   })
  //   .catch((err) => {
  //     console.error('Error while verifying token ', err);
  //     return res.status(403).json(err);
  //   });

  // }
  // admin
  // .auth()
  // .verifyIdToken(idToken)
  // .then((decodedToken) => {
  //   req.user = decodedToken;
  //   return db
  //     .collection('users')
  //     .where('userId', '==', req.user.uid)
  //     .limit(1)
  //     .get();
  // })

  // .then((data) => {
  //   res.locals.userHandle = data.docs[0].data().handle;
  //   res.locals.imageUrl = data.docs[0].data().imageUrl;
  //   return next();
  // })
  // .catch((err) => {
  //   console.error('Error while verifying token ', err);
  //   return res.status(403).json(err);
  // });

  // } else {
  //   console.error('Error while verifying token', err);
  //   return res.status(403).json(err);
  // }
};
