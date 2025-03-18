const { Router } = require("express");
const courseRouter = Router();


courseRouter.post('/purchase', function(req, res){
    res.json({
        msg :  "done "  
     })
})

courseRouter.get('/preview', function(req, res){
    res.json({
        msg :  "done courses"  
     })
})

module.exports = courseRouter ; 
    
