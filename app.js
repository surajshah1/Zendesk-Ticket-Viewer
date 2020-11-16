const express = require('express');
const path = require('path');
const routes = require('./routes')
const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.listen(app.get('port'),function(){
    console.log('Server started on http://localhost:' + app.get('port'));
});
