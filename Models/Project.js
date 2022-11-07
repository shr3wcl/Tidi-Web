const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
