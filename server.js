var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles= {
    'ArticleOne' : {
        title: 'Article_One',
        date: 'Sept 5, 2018',
        heading: '1st Heading',
        paragraph: '<p>Content of 1st Article Heading</p>'
    },
    'ArticleTwo' : {
        title: 'Article_One',
        date: 'Sept 10, 2018',
        heading: '2nd Heading',
        paragraph: '<p>Content of 2nd Article Heading</p>'
    },
    'ArticleThree' : {
        title: 'Article_One',
        date: 'Sept 15, 2018',
        heading: '3rd Heading',
        paragraph: '<p>Content of 3rd Article Heading</p>'
    }
};
function createTemplete(data){
    
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var paragraph = data.paragraph;
    
        var htmlContent = `
        <html>
        <head>
        <title>
            ${title}
        </title>
        <link rel="stylesheet" href="ui/style.css">
        </head>
        <body>
            <div class="container">
                <div>
                    ${date}
                </div>
                
                <div>
                    <h1>${heading}</h1>
                </div>
                
                <div>
                    ${paragraph}
                </div>
                
            </div>
        </body>
        </html>
        `;
        return htmlContent;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req, res){
    var articleName = req.param.articleName;
    res.send(createTemplete(articles[articleName]));
});

app.get('/article_one',function(req, res){
  res.send(createTemplete(ArticleOne));
});

app.get('/article_two',function(req, res){
  res.send(createTemplete(ArticleTwo));
});
app.get('/article_three',function(req, res){
  res.send(createTemplete(ArticleThree));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
