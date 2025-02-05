import mongoose from "mongoose"




export async function connectDb() {

    try {
  
      const url = "mongodb+srv://irfanusuf33:robolox@robolox.xnj0z.mongodb.net/techtronix?retryWrites=true&w=majority&appName=robolox"
      const connect = await mongoose.connect(url)
  
      if (connect) {
  
        console.log("connected")
      }
  
    } catch (error: any) {
      console.error(error.message)
    }
  }


