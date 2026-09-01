const express = require('express');
const app = express();

app.set('view engine', 'ejs')

// Middleware que deja al ususario acceder a archivos publicos estaticos, que no van a cambiar
app.use(express.static('public'));
// La forma para acceder a informacion que viene de un formulario es con el siguiente Middleware:
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     console.log('Hola');
//     res.render('index', {text: "World"});
// })

const userRouter = require('./routes/users');

app.use('/users', userRouter);



app.listen(3000)