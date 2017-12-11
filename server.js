const express= require('express');
const hbs = require('hbs');
const fs= require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
var app = express(); 



//In order to use a partial, it must be registered via Handlebars.registerPartial.
hbs.registerPartials((path.join(__dirname, 'views', 'partials')));

app.set('view engine', 'hbs');//set view engine as hbs

//using middleware for express
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//send files saved in public folder directly
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scremIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    /*res.send({
        name: 'Abhijit',
        likes: ['Biking', 'Cities']
    });*/
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        WelcomeMessage : 'Welcome to my website'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

//bad 
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something bad happened'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});