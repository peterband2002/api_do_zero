import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => { // Isso daqui é uma Promisse ou uma requisição assíncrona

    await prisma.user.create({ 
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/users', async(req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {
    
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })
    
    res.status(200).json(user)
})

app.listen(3001)