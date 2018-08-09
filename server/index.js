const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();


//middle
const checkForSession = require('./middlewares/checkForSession');


//controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');

const app = express(); 


app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true 
}));
app.use(checkForSession);

app.use( express.static( `${__dirname}/build` ) );

//swag
app.get('/api/swag', swag_controller.read);

//auth
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register );
app.post('/api/signout', auth_controller.signout );
app.get('/api/user', auth_controller.getUser );

//cart
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);


app.listen(process.env.PORT, () => {console.log('server listening on port ${3000}')})






















