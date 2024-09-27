import express from 'express'

const app = express() // Passar o express como uma função
app.use(express.json())

const users = []

// Criar usuário
app.post('/users', (req, res) => {
    users.push(req.body)

    res.status(201).json({ message: "Usuário criado!" })
})

// Listar todos os usuários
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

// Listar usuário por id
app.get('/users/:id', (req, res) => {
    const userId = users.findIndex(user => user.id === Number(req.params.id))

    if (userId != -1) {
        res.status(200).json(users[userId])
    } else {
        res.status(404).json({ message: "Usuário não encontrado!" })
    }
})

// Atualizar usuário
app.put('/users/:id', (req, res) => {
    let userId = users.findIndex(user => user.id === Number(req.params.id))

    if(userId != -1) {
        users[userId].nome = req.body.nome
        users[userId].idade = req.body.idade
        users[userId].idade = req.body.idade
        res.status(200).json({ message: "Usuário atualizado!" })
    } else {
        res.status(404).json({ message: "Usuário não encontrado!" })
    }
})

// Excluir usuário
app.delete('/users/:id', (req, res) => {
    let userId = users.findIndex(user => user.id === Number(req.params.id))

    if(userId != -1) {
        users.splice(userId, 1)
        res.status(200).json({ message: "Usuário excluído!" })
    } else {
        res.status(404).json({ message: "Usuário não encontrado!" })
    }
})

app.listen(3001)

