const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/donors', (req, res) => {
    res.render('donors')
})
app.get('/families', (req, res) => {
    res.render('families')
})

app.listen(3000, () => {
    console.log('listening')
})
