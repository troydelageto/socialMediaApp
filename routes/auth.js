const router=require("express").Router();
const User=require("../models/User")
const bcrypt=require("bcryptjs")

// ===========================
//     REGISTER ROUTE
// ===========================

router.post('/register',async (req,res)=>{
// the Password Hashing
const salt = await bcrypt.genSalt(10)  
const hashPassword=await bcrypt.hash(req.body.password,salt)

// =================================
//      CREATING A NEW USER
// ==================================
    const newUser= await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword

    })
    
    try {

         const user=await newUser.save();
         res.status(200).json(user);
         console.log(res.body.UserId);

    } catch (error) {
        res.status(500).send(error)  
    }

        
})

router.get('/register',(req,res)=>{
    res.status(200).send({
        "message":"this is register link"
    })
})


// ===============================
//           LOGIN ROUTE
// ===============================

router.post('/login',async (req,res)=>{
    
    try {
    // ===============================
    // CHECKING IF EMAIL EXIST
    // ===============================
   const validUser=await User.findOne({email:req.body.email}) 
   if(!validUser){res.status(400).json({"message":"Email not found"})}
   
   // ====================================
   // CHECKING IF PASSWORD EXIST
   //=====================================
   const validPassword= await bcrypt.compare(req.body.password,validUser.password)
   if(!validPassword){res.status(400).json({"message":"Password incorrect"})}

   res.status(200).json({"message":"You are loggged in"})
        
    } catch (error) {
        res.status(500).json(error)
    }
   
})



module.exports=router;