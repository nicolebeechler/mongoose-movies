const Movie = require('../models/movie')
const Performer = require('../models/performer')
/*
// POST /movies: Accepst Movie Data and Creates A Movie
router.post('/', movieCtrl.create)
// GET /movies: Returns a list of all movies.
router.get('/', movieCtrl.index)
// GET /movies/:id: Gets An Individual Movie
router.get('/:id', movieCtrl.show)
// POST /movies/:movieId/performers/:performerId
router.post('/:movieId/performers/:performerId', movieCtrl.addPerformer)
*/

// INDUCES

exports.create = async function create(req, res) {
    try {
        const createdMovie = await Movie.create(req.body)
        res.status(200).json(createdMovie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.index = async function(req, res) {
    try {
        const foundMovies = await Movie.find({})
        res.status(200).json(foundMovies)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.show = async function show(req, res) {
    try {
        const foundMovie = await Movie.findOne({_id: req.params.id})
        res.status(200).json(foundMovie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.addPerformer = async function addPerformer(req, res) {
try {
    const foundPerformer = await Performer.findOne({ _id: req.params.performerId })
    if(!foundPerformer) throw new Error(`Could not locate performer with id ${req.params.performerId}`)
    const foundMovie = await Movie.findOne({ _id: req.params.movieId })
    if(!foundMovie) throw new Error(`Could not locate movie with id ${req.params.movieId}`)
    // many to many
    foundMovie.cast.push(foundPerformer._id)
    foundPerformer.credits.push(foundMovie._id)
    await foundMovie.save()
    await foundPerformer.save()
    res.status(200).json({ 
        msg: `Successfully associated performer with ID ${req.params.performerId} with movie with ID ${req.params.movieId}`, 
        movie: foundMovie, 
        performer: foundPerformer
    })
} catch (error) {
    res.status(400).json({ msg: error.message })
}
}