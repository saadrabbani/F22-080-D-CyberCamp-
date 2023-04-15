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
    try {
      const pathName = req.body.pathName;
      const path = await Path.findOne({ pathName });
      if (path) {
        // path with the same name already exists
        res.status(300).json({ message: "Path with the same name already exists" });
      } else {
        // path with the same name does not exist
        // create a new path document
        const newPath = new Path({
          pathName: req.body.pathName,
          description: req.body.description,
        });
        newPath.save()
          .then(path => res.json(path))
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "A Server error occurred" });
    }
  }
// @desc    Update path
// @route   PUT /api/paths/:id
// @access  Private
const updatePath = async (req, res, next) => {
    try {
        const pathName = req.body.pathName;
        const path = await Path.findOne({ pathName });
      if (!path) {
        res.status(404).json({ message: "Path not found" });
        return;
      }
  
      // update the path document with the new data
      path.pathName = req.body.pathName;
      path.description = req.body.description;
      await path.save();
  
      res.json(path);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  }
// @desc    Delete path
// @route   DELETE /api/paths/:id
// @access  Private
const deletePath = async (req, res, next) => {
    try {
        const pathName = req.body.pathName;
        const path = await Path.findOne({ pathName });
      if (!path) {
        res.status(404).json({ message: "Path not found" });
        return;
      }
  
      // delete the path document
      await path.remove();
      res.json({ message: "Path successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  }

module.exports = {
    getPaths,
    getPath,
    addPath,
    updatePath,
    deletePath
}


 
