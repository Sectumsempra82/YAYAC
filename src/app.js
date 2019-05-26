import express from 'express';
import path from 'path';
import fs from 'fs';
import AppDAO from './sqlite/Dao';
import YayacRepository from './sqlite/YayacRepository';

const app = express();
app.use(express.json());
let initScripts = true
try {
    if (fs.existsSync('./src/sqlite/appDb.db')) {
      initScripts = false
      console.log('DB FOUND')
    }else{
        console.log('DB NOT FOUND')
    }
    
  } catch(err) {
    console.error(err)
  }
const dao = new AppDAO('./src/sqlite/appDb.db');

const appRepo = new YayacRepository(dao);

if (initScripts) {
    console.log('STARTING DB SCRIPTS')
    appRepo.createTables().then(() => console.log('DB SCRIPTS HAVE RUN')).catch(err => console.log(err));
}else{
    console.log('DB SCRIPTS SKIPPED')
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// An api endpoint that returns a list of academies
app.get('/api/getList', (req, res) => {
    appRepo.getAll()
        .then(list => res.json(list) )
        .catch(err => console.log(err));;
});


app.post('/api/addAcademy', (req, res) => {
    appRepo.addAcademy(req.body)
    .then(() => res.status(200).send(JSON.stringify('Copy that')))
    .catch(err => res.status(409).send(JSON.stringify("Error:" + err )));
});

// Routes everything else to our React app, taking in consideration the kind of environment we want to run
var env = process.argv[0] || 'dev';
switch (env) {
    case 'dev':

        app.get('*', (req, res) => {
            var fullUrl = req.protocol + '://localhost:3000' + req.originalUrl;
            res.redirect(fullUrl);
        });
        break;
    case 'prod':
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../client/build/index.html'));
        });
        break;
    default:
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../client/build/index.html'));
        });
        break;
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


