import mongoose from "mongoose";




export async function ConnectTODB (){
    
await mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
})

}