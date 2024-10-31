import bcryptjs from "bcryptjs"
import { User } from '../db.js'
import jsonwebtoken from "jsonwebtoken"


const registro = async (req, res) => {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body
    console.log(req.body)
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
    const teste = await User.create({ nome, sobrenome, email, senha: senhaCriptografada, dataNascimento })
    res.send('ok usuario criado')
}

const login = async (req, res) => {
    console.log(req)
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
    res.send(200).send({
        msg: "ok usuario logado",
        tokenJWT: token
    })
}

export { registro, login }