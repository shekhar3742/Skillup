const { Router } = require("express");
const adminRouter = Router();
const mongoose = require('mongoose');
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jsonweb = require("jsonwebtoken");
const JWT_Secret = "piyushhhhBhaiiii";


adminRouter.post("/signup", async function(req, res){

    const requireBody = z.object({
        email : z.string().min(4).max(20).email,
        password : z.string().min(4).max(20) ,
        firstname: z.string().min(4).max(20),
        lastname : z.string().min(4).max(20) ,

    })

    const parsedatasucess = requireBody.safeParse(req.body);
    if(!parsedatasucess){
        res.json({
               msg : "Incorrect format"
        })
        return 
    }

    const email = req.body.email;
    const password = req.body.password
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try{
        let errorthrown = false ;
        const hashedpassword = await bcrypt.hash(password , 5);
        console.log(hashedpassword);
    

    await adminModel.create({
        email : email,
        password : password ,
        firstname : firstname,
        lastname: lastname
    });
   }catch(e){
    res.json({
        msg : "user alredy exist"
    })
    errorthrown = true;
   }


})

adminRouter.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
     
    const response = await adminModel.findOne({
        email :email
    }) 

    if(!response){
        res.json({
            msg : "user not found "
        })
        return 
    }

    const hashpasswordmatch = await bcrypt.compare(password, response.password);

    if(hashpasswordmatch){
        const token = jsonweb.sign({
            id: response._id.toString()
        },JWT_Secret);
        res.json({
            token
        })
       
    }else{
        res.status(403).json({
            msg : "Incorrect credentials"
        })
    }

})

adminRouter.post("/course", function(req, res){

})

adminRouter.put("/course", function(req, res){

})

adminRouter.get("/course/bulk", function(req, res){

})

module.exports = adminRouter ; 

