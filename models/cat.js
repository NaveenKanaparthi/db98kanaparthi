const mongoose = require("mongoose")
const catSchema = mongoose.Schema({
cat_type: String,
cat_weight: String,
cat_color: String
})
module.exports = mongoose.model("cat", catSchema)