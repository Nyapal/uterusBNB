const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// let donors = [
//     {name: 'Maria', age: '23', race: 'African-American', college: 'Fisk, Class of 2014'},
//     {name: 'Jasmin', age: '19', race: 'White', college: 'New York University, Class of 2020'},
//     {name: 'Rosa', age: '26', race: 'Korean', college: 'University of California Los Angeles, Class of 2013'},
//     {name: 'Eva Lynn', age: '22', race: 'Brazillian', college: 'Howard University, Class of 2016'}
// ]

const Donor = mongoose.model('Donor', {
    name: String,
    age: String,
    race: String,
    college: String,
    approved: Boolean
});

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/donors', (req, res) => {
    Donor.find()
    .then(donors => {
        res.render('donors', {donors: donors});
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/donors/new', (req, res) => {
    res.render('new-donor', {})
})

// DONOR APPLICATION
app.post('/donors', (req, res) => {
    Donor.create(req.body).then((donor) => {
        console.log(donor);
        res.redirect('/thank-you')
    }).catch((err) => {
        console.log(err.message)
    })
})

// INDIVIDUAL DONOR PROFILES
app.get('/donors/:id', (req, res) => {
    Donor.findById(req.params.id).then((donor) => {
        res.render('public-donors', {donor: donor})
    }).catch((err) => {
        console.log(err.message)
    })
})

//
app.put('/donors/:id', (req, res) => {
    Donor.findByIdAndUpdate(req.params.id, req.body)
    .then(donor => {
        res.redirect(`/donors/${donor._id}`)
    }).catch(err => {
        console.log(err.message)
    })
})

//
app.get('/donors/:id/edit', (req, res) => {
    Donor.findById(req.params.id, function(err, donor) {
        res.render('edit-donor', {donor: donor})
    })
})



// DELETE DONOR PROFILES
app.delete('/donors/:id', (req, res) => {
    Donor.findByIdAndRemove(req.params.id).then((donor) => {
        res.redirect('/donors')
    }).catch((err) => {
        console.log(err.message)
    })
})

app.get('/families', (req, res) => {
    res.render('families')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/thank-you', (req, res) => {
    res.render('thankyou')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('listening')
    const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/donors';
    mongoose.connect(db)
})

module.exports = app
