const Path = require('../models/pathModel');

// @desc    Get all paths
// @route   GET /api/paths
// @access  Public
const getPaths = async (req, res, next) => {
    try {
        const paths = await Path.find();
        if (paths) {
            res.json(paths);
        }
        else {
            res.status(400).json({message: 'Paths not found'});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc    Get single path
// @route   GET /api/paths/:id
// @access  Public
const getPath = async (req, res, next) => {
    try {
        const path = await Path.findById(req.params.id);
        if (!path) {
            return res.status(404).json({ success: false });
        }
        return res.status(200).json({
            success: true,
            data: path
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc    Add path
// @route   POST /api/paths
// @access  Private
const addPath = async (req, res, next) => {
    const path = new Path({
        pathName: req.body.pathName,
        description: req.body.description,
        
    });
    path.save()
        .then(path => res.json(path))
        .catch(err => console.log(err));
}

// @desc    Update path
// @route   PUT /api/paths/:id
// @access  Private
const updatePath = async (req, res, next) => {
    try {
        const path = await Path.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!path) {
            return res.status(404).json({ success: false });
        }
        return res.status(200).json({
            success: true,
            data: path
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc    Delete path
// @route   DELETE /api/paths/:id
// @access  Private
const deletePath = async (req, res, next) => {
    try {
        const path = await Path.findByIdAndDelete(req.params.id);
        if (!path) {
            return res.status(404).json({ success: false });
        }
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getPaths,
    getPath,
    addPath,
    updatePath,
    deletePath
}


 
