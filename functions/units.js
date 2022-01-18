const { db } = require('./util/admin');

//create new affected unit
exports.createAffectedUnit = (req, res) => {
  const newAffectedUnit = {
    instructionId: req.body.instructionId,
    status: req.body.status,
  };
  const affectedUnitNumber = req.body.unitNumber;

  db.collection('Units')
    .doc(affectedUnitNumber)
    .collection('Instructions')
    .add(newAffectedUnit)
    .then((doc) => {
      res.json({ message: `affected unit ${doc.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};

// fetch a unit

exports.getUnit = (req, res) => {
  let unitData = [];
  db.collection(`/Units/${req.params.unitId}/Instructions`)
    .get()
    .then((querySnapshot) => {
      var results = [];
      querySnapshot.forEach((doc) => {
        let docData = doc.data();
        unitData.push(docData);
        var instructionRef = db
          .collection('allDocuments')
          .doc(docData.instructionId);
        results.push(instructionRef.get());
        // waiting forEach to finish before returning result https://stackoverflow.com/questions/47743082/waiting-for-a-foreach-to-finish-before-return-from-my-promise-function
      });
      return Promise.all(results);
    })
    .then((results) => {
      if (results.length > 0) {
        //copying results of instructions query by ID to unitData array of documents
        unitData.forEach((element, index) => {
          Object.assign(element, results[index].data());
        });
        return res.json(unitData);
      } else {
        return res.json([]);
      }
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.message });
    });
};
