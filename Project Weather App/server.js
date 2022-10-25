let projectData = {}; //projectData as an object to update it easier

//installing libraries
const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;

const server = app.listen(port, listening());

function listening(){
    console.log('server running on port ' + port);
}

app.post('/addData', post);

function post(req, res){
    let allData = { 
        weather: req.body.weather,
        date: req.body.date,
        input: req.body.input
    }

    projectData = allData; //assigning allData to the projectData to keep updated
    console.log(projectData);
}


app.get('/all', function(req, res){

    res.send(projectData); //sending projectData
    console.log(projectData);

});