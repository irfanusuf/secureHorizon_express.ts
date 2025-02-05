import Blog from "../models/blogmodel"



export const TemplateHandler = async (req: any, res: any) => {

  try {
    const { content, title, pictureUrl } = req.body

    const newBlog = await Blog.create({
      content, title, pictureUrl
    })

    if (newBlog) {

      return res.json({
        success: true,
        message: "Blog Created"
      })
    }
    else {

      return res.json({
        success: false,
        message: "Some Error!"
      })

    }

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Some Error!"
    })
  }
}


export const fetchBlogsHanlder = async (req: any, res: any) => {

  try {

    const blogs = await Blog.find()

    if (blogs.length > 0) {
      return res.json({ success: true, message: `${blogs.length} blogs found`,payload : blogs })
    }
    else {
      return res.json({
        success: false,
        message: "Some Error!"
      })
    }



  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Server Error | 500"
    })
  }
}








