const express = require('express');
const errorController = require('./controllers/error')
const app = express();

const path = require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./util/database');

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

// db.execute('SELECT * FROM products')
//     .then(result => {
//         console.log(result[1])
//     }).catch(err => {
//     console.log(err)
// });


app.set('view engine', 'pug');
app.set('views', 'views');

app.use(shopRoute.route);
app.use('/admin', adminRoute.route)

app.use(errorController.get404);

app.listen(3000);