const { db } = require('./util/admin');

exports.getAllDocuments = (req, res) => {
  db.collection('allDocuments')
    .orderBy('publishedAt', 'desc')
    .get()
    .then((data) => {
      let docList = [];
      data.forEach((doc) => {
        docList.push(doc.data());
      });
      return res.json(docList);
    })
    .catch((err) => console.error(err));
};

exports.createDocument = (req, res) => {
  const newDocument = {
    number: req.body.number,
    title: req.body.title,
    type: req.body.type,
    subsystem: req.body.subsystem,
    link: req.body.link,
    publishedAt: new Date(req.body.publishedAt).toISOString(),
  };

  db.collection('allDocuments')
    .add(newDocument)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};
