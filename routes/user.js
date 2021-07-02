const router=require("express").Router();
const bcrypt=require("bcryptjs")
const User=require("../models/User")

router.get('/',(req,res)=>{
    res.status(200).send({
        "message":"This is user route"
    });
})

// Update a user
router.put('/:id',async (req,res)=>{ 
    if(req.body.userId === req.params.id){
        console.log(req.body.params)
        if (req.body.password){
            try{
            salt= await bcrypt.genSalt(10)
            req.body.password= await bcrypt.hash(req.body.password,salt)

            }catch(err){
                return res.status(500).json(err)

            }

            try {
                const user= await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                })
                res.status(200).json("Account has been updated")
            } catch (error) {
                res.status(500).json(error)
                
            }
            
        }
         
    }else{
        return res.status(403).json("You can only update your account")
    }
})

// Delete a User
router.delete('',(res,req)=>{

})

// Get a User
router.get('',(req,res)=>{

})

// Follow a User


// Unfollow a User



module.exports=router;