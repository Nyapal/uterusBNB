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
// convert this shit to javascript sis 
require('./controllers/auth.js')(app);
require('./controllers/donors.js')(app);

//LANDING PAGE
app.get('/', (req, res) => {
    res.render('home')
})

// NEW FAMILY APPLICATION
app.get('/families', (req, res) => {
    res.render('families', {})
})

app.get('/families', (req, res) => {
    res.render('families')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/thank-you', (req, res) => {
    res.render('thank-you')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port ${port}` )
    const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/donors';
    mongoose.connect(db, { useNewUrlParser: true })
})

module.exports = app
