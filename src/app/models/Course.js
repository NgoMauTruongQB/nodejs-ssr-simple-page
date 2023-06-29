const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-updater')
const mongooseDelete =  require('mongoose-delete')
const ObjectId = Schema.ObjectId

const SchemaCourse = new Schema({
    name: { type: String },
    description: { type: String, max: 600 },
    img: { type: String },
    slug: { type: String },
    videoID: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
})

// Custom query helpers
SchemaCourse.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this
}

// Add flugins
mongoose.plugin(slug)
SchemaCourse.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: true, 
})

module.exports =  mongoose.model('Course', SchemaCourse)