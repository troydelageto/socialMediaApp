const mongoose = require("mongoose");

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },

    email:{
        type:String,
        required:true,
        max:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPhoto:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
       type:Boolean,
       default:false, 
    },
    desc:{
        type:String,
        max:50

    },
    city:{
        type:String,
        max:40
    },
    from:{
        type:String,
        max:40
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }

   
},

{timestamps:true}
)




module.exports=mongoose.model("User",UserSchema)