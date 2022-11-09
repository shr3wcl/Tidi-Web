const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({


}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
