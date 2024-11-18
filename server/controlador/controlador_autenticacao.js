import bcryptjs from "bcryptjs"
import { User } from '../db.js'
import jsonwebtoken from "jsonwebtoken"


const registro = async (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
        res.send('voce deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (userExiste) {
        res.send({nome: userExiste.nome})
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(senha, 10)
    const teste = await User.create({ nome, sobrenome, email, senha: senhaCriptografada, dataNasc: dataNascimento })
    res.send('ok usuario criado')
}

const login = async (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) {
        res.send('voce deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (!userExiste) {
        res.status(404).send('Este usuario nao existe')
        return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha)
    if (!senhaValida){
        res.status(401).send('senha invalida')
        return
    }
    const token = jsonwebtoken.sign(
        {
            "nome_completo": `${userExiste.nome} ${userExiste.sobrenome}`,
            "email": userExiste.email,
            "status": userExiste.status
        },
        'chavecriptografiajwt',
        {expiresIn: 1000*60*60*24*30}
    )
    res.status(200).send({
        msg: "ok usuario logado",
        tokenJWT: token,
        userInfo: userExiste
    })
}

const change_password = async(req, res) => {
    const user_id = req.params.id
    const nova_senha = req.body.novaSenha
    if (!nova_senha) {
        res.status(400).send('Todos os campos devem ser preenchidos')
        return
    }
    const user = await User.findOne({where:{id: user_id}})
    if(!user){
        res.status(404).send('User Not Found')
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(nova_senha, 10)
    user.senha = senhaCriptografada
    await user.save()
    res.status(200).send(user)
}

export { registro, login, change_password }