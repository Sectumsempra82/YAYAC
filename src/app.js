import express from 'express';
import path from 'path';
import AppDAO from './sqlite/Dao';
import YayacRepository from './sqlite/YayacRepository';

const app = express();

const dao = new AppDAO('./src/sqlite/appDb.db');
const appRepo = new YayacRepository(dao);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// An api endpoint that returns a list of academies
app.get('/api/getList', async (req, res) => {
    // var list = ["academy1", "academy2", "academy3"];
    const list = await appRepo.getAll();
    res.json(list);

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


