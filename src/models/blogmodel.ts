

import mongoose, { Schema, Document } from "mongoose";

interface BlogType extends Document {
    title: string;
    content: string;
    pictureUrl: string;
}

const BlogSchema = new Schema<BlogType>({
    title: { type: String, required: true , default : "Title" },
    content: { type: String, required: true },
    pictureUrl: { type: String, required: true , default : "Dummy pic" }
});




const Blog = mongoose.model<BlogType>("Blog", BlogSchema);

export default Blog;