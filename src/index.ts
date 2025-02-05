
import express from "express"
import cors from "cors";
import  {fetchBlogsHanlder, TemplateHandler }  from "./controllers/blogController";
import { connectDb } from "./config/connectDb";


const app = express();

app.use(express.json())
app.use(cors())

const port = 4001

connectDb()

app.post("/user/create/blog" , TemplateHandler)
app.get("/user/fetch/blogs" , fetchBlogsHanlder)




app.listen(port, () => {

  console.log(`Server Started on port ${port}`)
})



