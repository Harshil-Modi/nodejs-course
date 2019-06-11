const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // process.env.PORT this will be ture if app/server is running by HEROKU
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('capitalized', (text) => text.toUpperCase());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', `${log}\n`, (error) => {
        if (error) {
            console.log('Cannot append/create log file');
        }
    });
    console.log(log);
    next();
});

/*
 * Uncomment the following in case website is under maintenance 
 */
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     next();
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        message: 'Welcome to HBS'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: "Projects"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fulfill request at this moment"
    });
});

// app.listen(3000);
app.listen(port, (req) => {
    console.log(`Server is running on ${port}`);
});