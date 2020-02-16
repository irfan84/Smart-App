const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./components/register');
const signin = require('./components/signin');
const profile = require('./components/profile');
const image = require('./components/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'buddy123',
        database : 'smart-db'
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));

app.listen(3001, () => {
    console.log('app is running on port 3000');
});