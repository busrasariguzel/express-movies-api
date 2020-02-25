const express = require('express')
const router = express.Router();
const Movies = require('./models/Movies');


// getting all movies 

router.get('/', (req, res) => {
    Movies.find({})
    .then((movies) => {
    return res.json({movies})
        //  res.send(movies)
        //  return res.render('movies', {movies})
    }).catch(err => res.status(500).json({ message: 'Server Error', err }))
})

router.get('/:movie', (req,res)=> {
Movies.findOne({movie:req.params.movie})
.then((movie)=> {
    if(movie){
        return res.json({movie})
    } else {
        return res.status(500).json({message: "Movie does not exist", err})
    }
}).catch(err=>res.status(400).json({message: 'server error', err}))
});


router.get('/addmovies', (req, res) => {
    return res.render('addMovies')
});

router.post('/addmovies', (req, res) => {
    console.log(req.body)
    // make sure all inputs are filled
    if (!req.body.movie || !req.body.rating || !req.body.synopsis || !req.body.release || !req.body.genre || !req.body.box) {
        return res.status(400).json({ message: 'All inputs must be filled' });
    }
    //check to see if the name of the movie is already existing in the database
    Movies.findOne({ movie: req.body.movie })
        .then((movie) => {
            if (movie) {
                return res.status(500).json({ message: 'This movie already exists' })
            }
            // create a new movie
            const newMovie = new Movies();
            newMovie.movie = req.body.movie;
            newMovie.rating = req.body.rating;
            newMovie.synopsis = req.body.synopsis;
            newMovie.release = req.body.release;
            newMovie.genre = req.body.genre;
            newMovie.box = req.body.box;

            // save the movie 
            newMovie.save()
                .then((movie) => {
                    return res.status(200).json({ message: 'New movie is added', movie })
                })
                .catch(err => {
                    return res.status(500).json({ message: 'Could not add the movie', err })
                })
        }).catch(err => {
            return res.status(500).json({ message: 'Server Error', err })
        });
});


router.delete('/:movie', (req,res)=>{
Movies.findOneAndDelete({movie:req.params.movie})
.then((movies) => {
    if (movies) {
        return res.status(200).json({message: 'Movie is deleted', movies})
    } else {
        return res.status(200).json({message: 'No movie to delete'});
    }
    })
.catch(err => res.status(400).json({message: 'Could not delete the movie', err}))
});




module.exports = router