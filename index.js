//application packages
const express = require('express')
const app = express ()
const path = require('path')
//template engine
const hbs = require('express-handlebars')
//setup template engine directory and file extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+'/views/layouts'
}))

// setup static public directory
app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//import article route
const articleRoutes = require('./routes/article')

//to use articles
app.use('/', articleRoutes)
app.use('/article', articleRoutes)

// app start point
app.listen(3000, () => {
    console.log('app is started at http://localhost:3000')
})