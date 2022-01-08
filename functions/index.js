const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from corrective!');
});

exports.getDocs = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('allDocuments')
    .get()
    .then((data) => {
      let docList = [];
      data.forEach((doc) => {
        docList.push(doc.data());
      });
      return res.json(docList);
    })
    .catch((err) => console.error(err));
});

exports.createDocument = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({error: 'Method not allowed'})
  }
  const newDocument = {
    number: req.body.number,
    title: req.body.title,
    publishedAt: admin.firestore.Timestamp.fromDate(new Date(req.body.publishedAt)),
  };

  admin
    .firestore()
    .collection('allDocuments')
    .add(newDocument)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
});
