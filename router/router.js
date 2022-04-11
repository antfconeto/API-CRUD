const router = require("express").Router()
const User = require("../models/user")
router.get('/', (req, res) => {
    res.json({ message: "Oi aqui é o json" })
})

router.post("/user", async (req, res) => {
    const { nome, idade, salario } = req.body
    if (!nome || !idade || !salario) {
        res.status(422).json({ warning: "Digite todas as informções" })
    } else if (nome == "" || idade == "" || salario == "") {
        res.status(422).json({ warning: "Digite informações validas" })
    }
    const newUser = {
        nome,
        idade,
        salario
    }

    try {
        await User.create(newUser)
        res.status(201).json({ message: "User cadastrado" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get("/userGet", async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json({ users: users })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get("/userGetId/:id", async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            res.status(422).json({
                warning: "User not found"
            })
            return
        }
        res.status(201).json({
            user: user
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch("/updateUser/:id", async (req, res) => {
    const id = req.params.id
    const { nome, idade, salario } = req.body
    const user = {
        nome,
        idade,
        salario
    }



    const updateUser = await User.updateOne({ _id: id }, user).then(() => {
        res.status(200).json({
            message: "success"
        })
    }).catch(() => {
        res.status(erro).json({
            erro: erro
        })
    })



})

router.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id
    const userDelete = await User.findByIdAndDelete({ _id: id }).then(() => {
        res.status(201).json({
            message: "User deleted"
        })
    }).catch((erro) => {
        res.status(500).json({ erro: erro })
    })
})

module.exports = router
