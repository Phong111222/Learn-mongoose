const express = require('express');
const db = require('./database/database');
const UserRouter = require('./Routes/userRouter');
const app = express();
db.then(() => console.log('Connected to MongoDB')).catch((err) =>
  console.log(err)
);
app.use(express.json());

app.use('/api/v1/auth/', UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
