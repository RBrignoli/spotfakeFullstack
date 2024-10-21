import Express from "express";
import { criarTabelas, User } from './db.js';

const app = Express()
app.use(Express.json())
criarTabelas()

app.post('/registro', async (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body
    if (!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('voce deve preencher todos os campos')
        return
    }
    const teste = await User.create(req.body)
    //verificar se o usuario existe no banco de dados
    //encriptar a senha do usuario
    //salvar o usuario no banco de dados
    res.send('ok usuario criado')
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body
    if (!email || !senha){
        res.send('voce deve preencher todos os campos')
        return
    }
    //verificar se o usuario existe no banco de dados
    // comparar a senha do usuario com a senha salva no banco
    // criar um token de autenticação para este usuario
    //retornar a mensagem com o token
    res.send('ok usuario logado')
})

app.listen(8000)