import {Router} from 'express'
import {prisma} from '../db/prisma.js'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json({error: `Error loading posts ${error}")`})
    }
});

router.get('/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                comments: true,
            }
        })

        if(!post){
            return res.status(404).json({error: `Post with id ${id} not found`})
        }
        res.json(post);
    }
    catch(error){
        res.status(500).json({error: `Error loading posts ${error}`})
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const  id  = parseInt(req.params.id);
        const comments = await prisma.comment.findMany({
            where: {
                postId: id
            }
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: `Error loading comments ${error}` });
    }
});

export default router;