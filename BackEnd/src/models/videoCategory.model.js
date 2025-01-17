const mongoose = require('mongoose');

const videoCategoryRelationSchema = new mongoose.Schema({
  v_id: {
    type: String,
    required: true
  },
  cat_id: {
    type: String,
    required: true
  }
});

const VideoCategoryRelation = mongoose.model('VideoCategoryRelation', videoCategoryRelationSchema);

module.exports = VideoCategoryRelation;