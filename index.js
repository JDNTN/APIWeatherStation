const express = require('express');

//DB
const sequelize = require('./Model/Db');
const Models = require('./Model/CreateModels');

//Passport
const passport = require('passport');
const session = require('express-session');
const helpers = require('./Lib/Helpers');

//Initialization
const app = express();
require('./Lib/Passport');

//Middlewares
app.use(session({
  secret: 'Conecta',
  resave:false,
  saveUninitialized:false,
 // store: new PgStore(database),
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./Routes/LoggerRoutes'));
app.use(require('./Routes/StationRoutes'));
app.use(require('./Routes/SensorRoutes'));
app.use(require('./Routes/DataRoutes'));

app.get('/', async (req, res) => {
    res.send(await helpers.encryptPassword("985210"));
  })

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
      sequelize.sync({ force: false }).then(() => { //Cambiar a true para que la db se actualice (si se hicieron modificaciones o no se ha creado) sino dejar en false
        console.log("Conexion establecida");
      }).catch(error => {
        console.log("Se ha producido un error al momento de intentar conectar c>");
      })
});