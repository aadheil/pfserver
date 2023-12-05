// import express
const express=require('express')
// import userController js file
const userController=require('../Controllers/userController')

const projectController=require('../Controllers/projectController')

const multerConfig=require('../Middlewares/multerMiddleware')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

// create router for express app using Router()
const router =new express.Router()

// define different routes for server app
// register
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add projects
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// get use projects
router.get('/user/allprojects',jwtMiddleware,projectController.getAllUserProjects)

// gethome projects
router.get('/home/projects',projectController.getHomeProjects)

// getall projects
router.get('/projects/all',projectController.getallprojects)

// edit project path parameter is id
router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

// delete project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteProject)

// update user profile
router.put('/user/update',jwtMiddleware,multerConfig.single('profileImage'),userController.updateProfile)
// export router
module.exports = router
