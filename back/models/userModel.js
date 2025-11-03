import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

userSchema.pre('save',async function(next){
    if(!this.isModified()) return next();

    try {
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (error) {
        console.log("error in userModel "+error.message);
        next(error);
    }
    
})

const User = mongoose.model('users',userSchema);

export default User;