import mongoose from 'mongoose';

// Approach setup db using a connection string 
// make an async function 

const connectDB=async ()=>{
   try {
      await mongoose.connect(process.env.MONGOURI);
      console.log('DB CONNECTED');
   } catch (error) {
      console.log('Error connecting to DB ',error);
   }
}

export default connectDB;