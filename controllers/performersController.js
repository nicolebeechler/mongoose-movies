const Performer = require('../models/performer')

/*
// GET /performers: Returns a list of all performers.
router.get('/', performerCtrl.index)
// POST /performers: Accepts performer data and creates a new performer.
router.post('/', performerCtrl.create)
*/


exports.index = async (req, res) => {
    try {
        const performers = await Performer.find({})
        res.status(200).json(performers)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        const createdPerformer = await Performer.create(req.body)
        res.status(200).json(createdPerformer)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}