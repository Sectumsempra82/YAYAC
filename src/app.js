import express from 'express';
import path from 'path';

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a list of academies
app.get('/api/getList', (req,res) => {
    var list = ["academy1", "academy2", "academy3"];
    res.json(list);
    console.log('Sent list of yoda academies');
});

// Routes everything else to our React app
var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
        app.get('*', (req,res) =>{
            res.redirect('http://localhost:3000');
        });
        break;
    case 'prod':
        app.get('*', (req,res) =>{
            res.sendFile(path.join(__dirname+'/client/build/index.html'));
        });
        break;
}
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
 
console.log('App is listening on port ' + port);


