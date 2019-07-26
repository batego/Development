var express = require('express');
var app = express();

//un parametro ej: localhost:3000/usuario?user:dereck
app.get('/usuario/:user', function (req, res) {
    res.send(`hola ${req.params.user}, soy un servidor`);
});

//params + data  Ej: localhost:3000/autores/boris/cienañosdesoledad
app.get('/autores/:autor/:libro', function (req, res) {
    res.send(`Autor ${req.params.autor}, Libro: ${req.params.libro}`);
});

//params + data  Ej: localhost:3000/autores/boris?ano=2019
app.get('/autores/:autor', function (req, res) {
    res.send(`Autor ${req.params.autor}, Año: ${req.query.ano}`);
});

app.get('/', function(req, res){
    res.send('Hola Mundo');
});

app.listen(3000, function(err){
    if (err) {
        return console.log('Hubo un error'), process.exit(1);
    }
    console.log('Development Listening on port 3000');
})