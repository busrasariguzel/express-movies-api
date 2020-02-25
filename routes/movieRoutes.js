const express= require('express')
const router = express.Router();
const Movies = require('./models/Movies');


// getting all movies 

router.get('/movies',(req,res)=> {
    Movies.find({}).then((movies) => {
        return res.render('movies', {movies})
    }).catch(err=> res.status(500).json({message: 'Server Error', err}))
})

router.get('/addmovies',(req,res)=> {
    
})