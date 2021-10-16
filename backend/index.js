const path = require('path');
const express = require("express");
//const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

//const corsOptions = {
//    origin: 'http://127.0.0.1:8080',
//    optionsSuccessStatus: 200 // For legacy browser support
//}

//app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend')));

app.get("/static/images/tea/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/src/static/images/tea/', req.params[0]));
});


// Default Route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
