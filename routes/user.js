const { Router } = require("express");

const  { userModel  }  = require("../db");
const mongoose = require("mongoose");
const { z, string } = require("zod");
const bcrypt = require("bcrypt");
const jsonweb = require("jsonwebtoken");
const JWT_Secret = "piyushhhhBhaiiii";
const userRouter = Router();



 userRouter.post("/signup", async function (req, res) {
  console.log("Signup route hit", req.body);
  res.json({ msg: "Received request" });

  const requireBody = z.object({
    email: string().email().min(4).max(20),
    password: string().min(4).max(20),
    firstname: string().min(4).max(20),
    lastname: string().min(4).max(20),
  });
  
  const parsedatasucess = requireBody.safeParse(req.body);
  if(!parsedatasucess.success){
    res.json({
        msg : "Incorrect format"
    })
    return 
    
  }
  
  const { email, password, firstname, lastname } = req.body;

  try{
    let errorthrown = true ; 
  const hashedpassword = await bcrypt.hash(password, 5);
  console.log(hashedpassword);

  await userModel.create({
    email: email,
    password: hashedpassword,
    firstname: firstname,
    lastname: lastname,
  });
}catch(e){
    res.json({
        msg : "user alredy exist"
    })
    errorthrown = true;

}

});



userRouter.post("/signin", async function (req, res) {
    const {email, password} = req.body;

    const respone = await userModel.findOne({
        email
    })

    if(!respone){
        res.json({
            msg : "user not found "
        })
        return 
    }

    const hashpasswordmatch = await bcrypt.compare(password, respone.password)
    if(hashpasswordmatch){
        const token = jsonweb.sign({ 
            id : respone._id.toString()
        }, JWT_Secret)
        res.json({
            msg : token
        })
    }else{
        res.status(403).json({
            msg : "Incorrect credentials"
        })
    }


   



});

userRouter.post("/purchase", function (req, res) {});

module.exports = userRouter ;
