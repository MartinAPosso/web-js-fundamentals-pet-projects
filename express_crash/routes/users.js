const express = require('express');
const router = express.Router();

router.use(logger);

router.get('/', (req, res) => {
    res.send('Usuarios en router');
})

router.get('/new', (req, res) => {
    res.render('users/new');
})

router.post('/', (req, res) => {
    const isValid = true;
    if(isValid){
        users.push({firstName: req.body.firstName});
        res.redirect(`/users/${users.length - 1}`);
    }else{
        console.log("Error");
        res.render('users/new', {firstName: req.body.firstName});
    }
    
})

router.route('/:id')
    .get((req, res) => {
        console.log(req.user);
        res.send(`Get usuario con id: ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Get usuario con id: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete usuario con id: ${req.params.id}`);
    });

// Esto es basicamente un middleware para parametros de consulta
const users = [{ name:"Kyle" }, { name:"Sally" }]
router.param('id', (req, res, next, id) =>{
    req.user = users[id];
    next();
})

function logger(req, res, next){
    console.log(req.originalUrl);
    next();
}

module.exports = router;