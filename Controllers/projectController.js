
const projects=require('../Models/projectSchema')
// add project
exports.addProject=async(req,res)=>{
    console.log("Inside add project function");
    const {title,languages,github,website,overview,userId}=req.body
    const projectImage=req.file.filename

    // console.log(`${title}, ${languages}, ${github}, ${website}, ${overview}, ${projectImage}, ${userId}`);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists....")
        }
        else{
            const newProject=new projects({
                title,languages,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)
    }

}


// get all user projects 
exports.getAllUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        
            res.status(200).json(userProjects)
        

    }
    catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)

    }
}

// get home projects
exports.getHomeProjects=async(req,res)=>{
    try{
        const homeprojects=await projects.find().limit(3)
        
            res.status(200).json(homeprojects)
        

    }
    catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)

    }
}

// get all projects
exports.getallprojects=async(req,res)=>{
    const searchkey=req.query.search
    const query={
        languages:{$regex:searchkey,$options:"i"}
    }
    try{
        const allprojects=await projects.find(query)
        
            res.status(200).json(allprojects)
        

    }
    catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)

    }
}


// edit project
exports.editProject=async(req,res)=>{
    const userId=req.payload
    const {title,languages,github,website,overview,projectImage}=req.body
    const uploadedImage = req.file?req.file.filename:projectImage
    const {id}=req.params

    try{
      const updateProject=await projects.findByIdAndUpdate({_id:id},{
        title,languages,github,website,overview,projectImage:uploadedImage,userId
    },{new:true})

    await updateProject.save()
    res.status(200).json(updateProject)


    }catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)

    }
    

}

// delete a projec
exports.deleteProject=async(req,res)=>{
    const {id} = req.params
    try{
    const removeProject = await projects.findByIdAndDelete({_id:id})
    res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(`Error!!! Transaction failed : ${err}`)
    }
}