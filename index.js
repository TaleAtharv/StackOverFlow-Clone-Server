// import express from "express"
// import mongoose from "mongoose"
// import cors from 'cors'
// import dotenv from 'dotenv'
// import userRoutes from './routes/users.js'
// import questionsRoutes from './routes/Questions.js'
// import answerRoutes from './routes/Answer.js'

// const app = express();
// dotenv.config();
// app.use(express.json({ limit: "30mb", extended: true }))
// app.use(express.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send("This is a stack overflow clone API")
// })

// app.use('/user', userRoutes)
// app.use('/questions', questionsRoutes)
// app.use('/answer', answerRoutes)


// const PORT =  9999;

// const CONNECT_URL = process.env.CONNECTION_URL

// // mongoose.createConnection( CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
// //     .catch((err) => console.log(err.message))

// const connectToDatabase = async () => {
//     try {
//        mongoose.createConnection(CONNECT_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log(`Connected to the database`);
//       app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
  
//   connectToDatabase();
  
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import questionsRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answer.js';

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ... existing code ...
app.use('/user', userRoutes)
app.use('/questions', questionsRoutes)
app.use('/answer', answerRoutes)

const PORT = 9999;
const CONNECT_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
