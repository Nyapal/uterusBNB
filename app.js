const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

const Donor = mongoose.model('Donor', {
    name: String,
    age: String,
    race: String,
    status: { type: Boolean, default: 0 }
});

const Family = mongoose.model('Family', {
    name: String,
    email: String,
    message: String
})

//LANDING PAGE
app.get('/', (req, res) => {
    res.render('home')
})

// ALL DONORS - Nurses view only
app.get('/donors', (req, res) => {
    Donor.find()
    .then(donors => {
        res.render('donors', {donors: donors});
    })
    .catch(err => {
        console.log(err)
    })
})

// NEW DONOR APPLICATION
app.get('/donors/new', (req, res) => {
    res.render('new-donor', {})
})

// NEW FAMILY APPLICATION
app.get('/families', (req, res) => {
    res.render('families', {})
})

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
        console.log(donor)
        res.render('donor-profile', {donor: donor})
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

// APPROVE DONOR PROFILES
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

app.get('/public-donors', (req, res) => {
    Donor.find()
    .then(donors => {
        res.render('public-donors', {donors: donors});
    })
    .catch(err => {
        console.log(err)
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
