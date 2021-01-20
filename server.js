
const express = require('express');
const path = require('path');
const cors = require('cors');
var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
let app = express();
const mongoose = require('mongoose');
var port = normalizePort(process.env.PORT || '8000');
const UsersRoutes = require('./app/routes/userRoute')

const formidableMiddleware = require('express-formidable')




app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: "Tenantive API",
      servers: ["http://localhost:8000/"],
    },
    //basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: ["./app/controller/*.js"],
};


//mongoose.connect('mongodb+srv://admin:mdb456852@cluster0-sfxtq.mongodb.net/test?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://Form:AZER1234@cluster0.s21ii.mongodb.net/test',
  //mongoose.connect('mongodb+srv://admin:ZaS2OvseUT59PxeS@cluster0.nnwqx.mongodb.net/tenantive-prod?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors());
/*app.use(express.json())
app.use(express.urlencoded({ extended: true }))*/
const events = [
  {
    event: 'fileBegin',
    action: function (req, res, next, name, file) { /* your callback */ }
  },
  {
    event: 'field',
    action: function (req, res, next, name, value) {
      if (!req.myFields) {
        req.myFields = {}
      }
      if (req.myFields[name] == undefined) {
        req.myFields[name] = value
      } else {
        let aux = req.myFields[name]
        if (Array.isArray(req.myFields[name])) {
          req.myFields[name].push(value)
        } else {
          req.myFields[name] = [aux, value]
        }
      }
    }
  }
];
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: './public/files',
  multiples: true,
}, events));

app.get('/', (req, res) => {
  res.send('Express server is up and running.');
})

app.use('/', UsersRoutes);

var server = http.createServer(app);
server.listen(port, _ => console.log(`The server is listening on port ${port}`));

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}