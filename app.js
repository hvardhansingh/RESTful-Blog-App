var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    mongoose = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

// ROUTES

// INDEX ROUTE
app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log('Error !!!');
        }
        else {
            res.render('index1', { blogs: blogs });
        }
    });
});

// CREATE

app.get('/blogs/new', function (req, res) {
    res.render('newBlog');
});

app.post('/blogs', function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            console.log('Error !!!');
            res.render('newBlog');
        }
        else {
            res.redirect('/blogs');
        }
    });
});

//SHOW 

app.get('/blogs/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.render('show', { blog: blog });
        }
    });
});

// EDIT

app.get('/blogs/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.render('edit', { blog: foundBlog });
        }
    });
});

//UPDATE

app.put('/blogs/:id', function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

// DELETE

app.delete('/blogs/:id', function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err, deletedBlog) {
        if (err) {
            res.redirect('/blogs/' + req.params.id);
        }
        else {
            console.log(deletedBlog + " deleted !");
            res.redirect('/blogs');
        }
    });
});

app.listen(3000, function () {
    console.log('Serving at port 3000');
});
