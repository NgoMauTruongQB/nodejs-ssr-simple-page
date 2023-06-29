const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeControllers {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.countDocumentsDeleted(), Course.find({}).sortable(req)])
            .then(([countDocumentsDeleted, courses]) => {
                res.render('me/stored-courses', {
                    countDocumentsDeleted: countDocumentsDeleted,
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((deletedCourses) => {
                res.render('me/trash-courses', {
                  courses: mutipleMongooseToObject(deletedCourses)
                })
            })
            .catch(next)
    }
}

module.exports =  new MeControllers