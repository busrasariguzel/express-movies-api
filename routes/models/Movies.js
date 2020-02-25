const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    movieTitle : {type: String, unique: true, default:''},
    rating: {type: Number},
    synopsis : {type: String, default:""},
    releaseYear: {type: Number , unique:false, default:""},
    genre: {type: Array, default:""}
})

module.exports= mongoose.model('movies', MovieSchema)