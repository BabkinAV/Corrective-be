const functions = require('firebase-functions');

const cors = require('cors');

const { getAllDocuments, createDocument } = require('./instructions');

const { createAffectedUnit, getUnit, updateAffectedUnit } = require('./units');

const {createUser} = require('./user')

const FBAuth = require('./util/fbAuth')

const app = require('express')();

app.use(cors());

app.get('/alldocuments', getAllDocuments);
app.get('/unit/:unitId', getUnit);
app.get('/fbauth', FBAuth)

app.post('/createdocument', createDocument);
app.post('/createunit', createAffectedUnit);
app.post('/createuser', createUser);
app.patch('/updateunit/:unitId',FBAuth, updateAffectedUnit);

exports.api = functions.region('europe-west1').https.onRequest(app);
