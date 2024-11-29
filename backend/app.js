const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());
app.use(cors());

let db;

// To Start the Server
const initializeDBAndServer = async () => {
  const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME, PORT } = process.env;
  const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

  db = new MongoClient(url);

  try {
    await db.connect();
    console.log('Connected to MongoDB Database...');

    const serverPort = PORT || 3000;

    app.listen(serverPort, () => {
      console.log(`Server is running on port: ${serverPort}`);
    });
  } catch (error) {
    console.error(`Database connecting error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// API - 1 Create new application
app.post('/applications', async (req, res) => {
  const {
    solicitorName,
    solicitorEmail,
    loanAmount,
    purchasePrice,
    isValuationFeePaid,
    isUkResident,
  } = req.body;

  const collection = db.db(process.env.DB_NAME).collection('applications');

  try {
    const ltv = (loanAmount / purchasePrice) * 100;
    const isEligible = ltv < 60 && isValuationFeePaid && isUkResident;

    const riskRating = isEligible ? 'Medium' : 'High';
    const status = isEligible ? 'Passed' : 'Failed';

    const totalApplications = await collection.estimatedDocumentCount();
    const applicationDetails = {
      applicationId: uuidv4(),
      applicationNum: totalApplications + 1,
      solicitorName,
      solicitorEmail,
      loanAmount,
      purchasePrice,
      isValuationFeePaid,
      isUkResident,
      riskRating,
      ltv: `${ltv}%`,
      ltvStatus: ltv < 60 ? 'Passed' : 'Failed',
      isValuationFeePaidStatus: isValuationFeePaid ? 'Passed' : 'Failed',
      isUkResidentStatus: isUkResident ? 'Passed' : 'Failed',
      status,
      createdAt: new Date().toISOString(),
    };

    await collection.insertOne(applicationDetails);
    res.status(201).send({ message: 'Application Created Successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

// API - 2 Get All Application Details
app.get('/applications', async (req, res) => {
  const collection = db.db(process.env.DB_NAME).collection('applications');

  try {
    const applications = await collection.find().toArray();

    if (applications.length > 0) {
      res.status(200).send(applications);
    } else {
      res.status(404).send({ message: 'No Application' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

// API - 3 Get Application Details
app.get('/applications/:applicationId', async (req, res) => {
  const { applicationId } = req.params;

  if (!applicationId) {
    return res.status(400).send({ message: 'Incorrect Application ID' });
  }

  try {
    const collection = db.db(process.env.DB_NAME).collection('applications');
    const applicationDetails = await collection.findOne({ applicationId });

    if (applicationDetails) {
      res.status(200).send(applicationDetails);
    } else {
      res.status(404).send({ message: 'Application Not Found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});
