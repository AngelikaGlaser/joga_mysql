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

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect(function(err){
    if (err) throw err;
    console.log('connected to joga_mysql db')
})

//show all articles / index page
app.get('/', (req,res) => {
    let query = "SELECT * FROM article ";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })
})

//show article by this slug
app.get('/article/:slug', (req,res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${req.params.slug}'`
    con.query(query, (err, result) => {
        if (err) throw err
        res.render('article', {
            article: result
        })
    })
})

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE author_id = ${req.params.author_id};`
    let author = ''
    con.query(query, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            author = result[0].author
        }
        res.render('author', {
            articles: result,
            author: author
        })
    })
})

// app start point
app.listen(3000, () => {
    console.log('app is started at http://localhost:3000')
})