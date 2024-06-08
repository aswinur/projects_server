const { json } = require('express')
const projects = require('../Models/projectModel')


exports.addprojects = async (req, res) => {
    const userId = req.payload
    const { title, overview, language, github, demo } = req.body
    const image = req.file.filename
    console.log(title, overview, language, github, demo, userId, image)
    try {
        const exisitingProject = await projects.findOne({ github })
        if (exisitingProject) {
            res.status(406).json("Project already added")
        }
        else {
            const newProject = new projects({
                title, overview,/*languages:*/language, github, demo, image, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        console.log(err)
        res.status(401).json(err)
    }

}

exports.homeProjects = async (req, res) => {
    try {
        const result = await projects.find().limit(3)
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(400).json("No projects available")
        }
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }

}
exports.allProjects = async (req, res) => {
    console.log("inside allprojects");
    const search=req.query.search
    console.log(search);
    try {
        const query={
            language:{$regex:search,$options:'i'}
        }
        const result = await projects.find(query)
        console.log(result);
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("no projects available")
        }

    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }
}

exports.userProjects = async (req, res) => {
    try {
        const userId = req.payload
        const result = await projects.find({ userId })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("no projects available")
        }
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }
}


exports.editProject = async (req, res) => {
    const { title, overview, language, github, demo, image } = req.body
    const userId = req.payload
    const projectImage = req.file ? req.file.filename : image
    const { pid } = req.params
    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: pid },
            { title, overview, language: language, github, demo, image: projectImage, userId }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }
}

exports.removeProject = async (req, res) => {
    const { pid } = req.params
    try {
        const result = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err);
        res.status(406).json(err)
    }

}