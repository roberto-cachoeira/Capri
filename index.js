const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(`/`, express.static(path.join(__dirname, 'static')));

app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get(`/`, (req, res) => {
    res.render('index', { activePage: 'home' });
});    

app.use((req, res, next) => {
    res.status(404).render('404', { activePage: '404'});
    
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {      
    console.log(`Server started on port 3000...`);  
  
});