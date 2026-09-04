import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {
  // Ignore in environments where setting custom DNS servers is restricted
}
try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // Ignore if unsupported
}
import mongoose from 'mongoose';
const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  }catch(err){
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
}

export default connectDB;