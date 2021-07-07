const router=require("express").Router();
const bcrypt=require("bcryptjs")
const User=require("../models/User")

router.get('/',(req,res)=>{
    res.status(200).send({
        "message":"This is user route"
    });
})

// Update a user
router.put("/:id", async (req,res)=>{ 
    console.log(req.body.userId === req.params.id, "from put route")
    console.log((req.body.userId), "Body" , (req.params.id), "params")
    
    if(req.body.userId === req.params.id){
        console.log(req.body.params)
        if (req.body.password||req.body.isAdmin){
            try{
            salt= await bcrypt.genSalt(10)
            req.body.password= await bcrypt.hash(req.body.password,salt)

            }catch(err){
                return res.status(500).json(err)

            }

            try {
                const user= await User.findOneAndUpdate(req.params.id,{
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
router.delete('/:id',async (res,req)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id,{
                $set:req.body
            });
            res.status(200).json({"message":"User deleted successfully"})
        } catch (error) {
            return res.status(500).json(error);
            
        } 
    }else{
        return res.status(403).json("You can only delete your account")
    }

})

// Get a User
router.get('/:id',async (req,res)=>{
    try {
        const user= await User.findById(req.params.id);
        const{password,updateAt,...otehr}=user._doc
        res.status(200).json(other)
        
    } catch (error) {
        res.status.apply(500).json(error)       
    }
})

// Follow a User
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user=await User.findById(req.body.userId);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.body.userId}});
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }
        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you can't follow yourself")
    }
})


// Unfollow a User

router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user=await User.findById(req.body.userId);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.body.userId}});
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you dont follow this user")
            }
        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you can't unfollow yourself")
    }
})

module.exports=router;