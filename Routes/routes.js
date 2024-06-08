
const express=require('express')
const userController=require('../Controllers/userControllers')
const projectController=require('../Controllers/projectcontroller')
const router=express.Router()
const jwtMiddle=require('../Middlewares/jwtMiddleware')
// const multerMiddleware=require('../Middlewares/multerMiddleware')
const multerconfig = require('../Middlewares/multerMiddleware')


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/addproject',jwtMiddle,multerconfig.single('image'),projectController.addprojects)
router.get('/home-projects',projectController.homeProjects)
router.get('/all-projects',jwtMiddle,projectController.allProjects)
router.get('/user-projects',jwtMiddle,projectController.userProjects)
router.put('/edit-project/:pid',jwtMiddle,multerconfig.single('image'),projectController.editProject)
router.delete('/delete-project/:pid',jwtMiddle,projectController.removeProject)
router.put('/profile-update',jwtMiddle,multerconfig.single('profile'),userController.userUpdateProfile)

module.exports=router