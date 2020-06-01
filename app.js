const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const routes = require('./routes.js')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/', routes)

// May cause prob in production. Check this out then.
// app.enable('view cache');


app.listen(3000);