const mongoose = require("mongoose")
const catSchema = mongoose.Schema({
cat_type: String,
cat_weight: String,
cat_color: Number
})
module.exports = mongoose.model("cat", catSchema)