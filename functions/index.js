const functions = require('firebase-functions');

const cors = require('cors');

const { getAllDocuments, createDocument} = require('./instructions');

const {createAffectedUnit, getUnit} = require('./units');


const app = require('express')();

app.use(cors());

app.get('/alldocuments', getAllDocuments );
app.get('/unit/:unitId', getUnit );

app.post('/createdocument', createDocument )
app.post('/createunit', createAffectedUnit )



exports.api = functions.region('europe-west1').https.onRequest(app);
