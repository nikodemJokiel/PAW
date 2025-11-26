require('dotenv').config()
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client')
const hostname = '127.0.0.1';
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

//Posts
app.get('/post', async (req, res) => {
    try{
        res.status(200).json(await prisma.post.findMany());
    }catch(err){
        res.status(500).json(err)
    }
})

app.get('/post/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const posts = await prisma.post.findUnique({
            where: {id: id}
        });
        if(posts==null){
            res.status(404).json('Post not found');
        }
        else {
            res.status(200).json(posts);
        }
    }catch(err){
        res.status(500).json(err)
    }
})

app.post('/post', async (req, res) => {
    try {
        const postContent = req.body;
        const post = await prisma.post.create({
            data: postContent
        })
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/post/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const postsContent = req.body;

        const post = await prisma.post.update({
            where: {id: id},
            data: postsContent
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/post/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const postContent = req.body;

        const post = await prisma.post.update({
            where: {id: id},
            data: postContent
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.delete('/post/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //deleting comments of deleted post
        await prisma.post.deleteMany({
            where: {postId: id}
        });

        const post = await prisma.post.delete({
            where: {id: id},
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Category

app.get('/category', async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/category/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({
            where: {id: id},
        })

        if (category==null) {
            res.status(404).json('Category not found');
        }
        else {
            res.status(200).json(category);
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/category', async (req, res) => {
    try {
        const categoryContent = req.body;
        const category = await prisma.category.create({
            data: categoryContent
        })
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/category/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categoryContent = req.body;
        const category = await prisma.category.update({
            where: {id: id},
            data: categoryContent
        })
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/category/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categoryContent = req.body;
        const category = await prisma.category.update({
            where: {id: id},
            data: categoryContent
        })
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.delete('/category/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.post.deleteMany({
            where: {categoryId: id}
        });

        const category = await prisma.category.delete({
            where: {id: id},
        })
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Comment

app.get('/comment', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get('/comment/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: {id: id},
        })

        if (comment==null) {
            res.status(404).json('Comment not found');
        }
        else {
            res.status(200).json(comment);
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

app.post('/comment', async (req, res) => {
    try {
        const commentContent = req.body;
        const comment = await prisma.comment.create({
            data: commentContent
        })
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put('/comment/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const commentContent = req.body;
        const comment = await prisma.comment.update({
            where: {id: id},
            data: commentContent
        })
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.patch('/comment/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const commentContent = req.body;
        const comment = await prisma.comment.update({
            where: {id: id},
            data: commentContent
        })
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.delete('/comment/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const comment = await prisma.comment.delete({
            where: {id: id},
        })
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.listen(port, hostname, () => {
    console.log(`Server started on port ${port}`);
})