const mongoose = require('mongoose');

const DisorderSchema = mongoose.Schema({
    disorder_type: String,
    disorder_categories: [{
        category: String,
        subcategories: [{
            subcategory: String,
            icd_9_cm: String,
            icd_10_cm: String,    
        }],
    }]
})

module.exports = mongoose.model("Disorder", DisorderSchema);