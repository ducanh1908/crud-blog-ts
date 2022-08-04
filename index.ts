import express from "express";
import { AppDataSource } from "./src/views/data-source";
import { Blog } from "./src/model/blog";
import bodyParser from "body-parser";
import multer from "multer";
import fileUpload  from "express-fileupload";
const PORT = 3000;

AppDataSource.initialize().then( async connection =>{
    const app = express();
    const upload = multer();
    app.use(bodyParser.json());
    app.use(express.json());
   
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.set('view engine','ejs');
    app.set('views','./src/views');

    const blogRepo = connection.getRepository(Blog)
    
    
    app.get('/blog/list',async (req, res)=>{
        const blogs = await blogRepo.find();
        res.render('bloglist',{blogs : blogs})
    })
    app.get('/blog/create', (req, res)=>{
        res.render('create-blog')
    });

    app.get('/blog/delete/:id', async (req, res)=>{
        let id = req.params.id;
        let idBlog = await blogRepo.delete(id)
        res.redirect(301,'/blog/list');
    });

    app.get('/blog/edit/:id', upload.none(),async (req, res)=>{
        let idBlog = +req.params.id
        const blog = await blogRepo.findOneBy({id:idBlog});
        res.render('edit-blog',{blog : blog} )
    });

    app.post('/blog/edit/:id', upload.none(),async (req, res)=>{
        let idBlog = +req.params.id
        let  blog = await blogRepo.findOneBy({id:idBlog});
        if(blog) {
           
            blog = await blogRepo.merge(blog,req.body);
            await blogRepo.save(blog)
        } 
        res.redirect(301,'/blog/list');
    });

    app.get('/blog/detail/:id', async (req, res)=>{
        let id = parseInt(req.params.id)
        const idBlog = await blogRepo.findOneBy({id:id});
        res.render('detail-blog', {blog : idBlog})
    });

    app.post('/blog/create', upload.none(),async(req, res)=>{
       
        let blogData = {
            title : req.body.title,
            content : req.body.content,
            image: req.body.image
        }

        const phone = await blogRepo.save(blogData)
        res.redirect('/blog/list')
    })

    app.listen(PORT, ()=>{
        console.log(`App is running port ${PORT}`);
    })
})