import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    passwordHash:{
      type:String,
      required:true,
      select:false
    },
    avatar:{
      type:String,
      default:""
    },
    status:{
      type:String,
      default:"offline"
    },
    lastSeen:{
      type:Date,
      default:Date.now
    }
  },{timestamps:true}
)

const User = mongoose.model("User", UserSchema)
export default User