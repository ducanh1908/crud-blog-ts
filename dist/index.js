"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./src/views/data-source");
const blog_1 = require("./src/model/blog");
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const upload = (0, multer_1.default)();
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    const blogRepo = connection.getRepository(blog_1.Blog);
    app.get('/blog/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield blogRepo.find();
        res.render('bloglist', { blogs: blogs });
    }));
    app.get('/blog/create', (req, res) => {
        res.render('create-blog');
    });
    app.get('/blog/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let id = req.params.id;
        let idBlog = yield blogRepo.delete(id);
        res.redirect(301, '/blog/list');
    }));
    app.get('/blog/edit/:id', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let idBlog = +req.params.id;
        const blog = yield blogRepo.findOneBy({ id: idBlog });
        res.render('edit-blog', { blog: blog });
    }));
    app.post('/blog/edit/:id', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let idBlog = +req.params.id;
        let blog = yield blogRepo.findOneBy({ id: idBlog });
        if (blog) {
            blog = yield blogRepo.merge(blog, req.body);
            yield blogRepo.save(blog);
        }
        res.redirect(301, '/blog/list');
    }));
    app.get('/blog/detail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let id = parseInt(req.params.id);
        const idBlog = yield blogRepo.findOneBy({ id: id });
        res.render('detail-blog', { blog: idBlog });
    }));
    app.post('/blog/create', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let blogData = {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        };
        const phone = yield blogRepo.save(blogData);
        res.redirect('/blog/list');
    }));
    app.listen(PORT, () => {
        console.log(`App is running port ${PORT}`);
    });
}));
