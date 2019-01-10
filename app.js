const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {msg: 'hbs'})
})

app.listen(3000, () => {
    console.log('listening')
})
