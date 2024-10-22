import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcryptjs"

const app = Express()
app.use(Express.json())
// criarTabelas()

app.post('/registro', async (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
        res.send('voce deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (userExiste) {
        res.send('usuario ja existe')
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(senha, 10)
    const teste = await User.create({ nome, sobrenome, email, senha: senhaCriptografada, dataNascimento })
    res.send('ok usuario criado')
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) {
        res.send('voce deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (!userExiste) {
        res.send('Este usuario nao existe')
        return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha)
    if (!senhaValida){
        res.send('senha invalida')
        return
    }
    
    // comparar a senha do usuario com a senha salva no banco
    // criar um token de autenticação para este usuario
    //retornar a mensagem com o token
    res.send('ok usuario logado')
})

app.listen(8000)