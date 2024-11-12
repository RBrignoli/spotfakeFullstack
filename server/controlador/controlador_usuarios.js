// criar controladro para listar todos os usuarios
import { User } from '../db.js'


const listar_usuarios = async (req, res) => {
    const users = await User.findAll()
    const parsed_users = users.map(item => ({id: item.id, nome: item.nome, email: item.email, status: item.status}))
    res.status(200).send(parsed_users)
}

const pegar_usuario = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({where:{id: user_id}})
    res.send(user)
}

const deletar_usuario = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({where:{id: user_id}})
    user.destroy()
    res.send('usuario deletado com sucesso')
}

const trocar_img = async (req, res) => {
    const user_id = req.params.id
    const nova_img_url = req.body.url
    if (!nova_img_url) {
        res.status(400).send('img nao encontrada')
        return
    }
    const user = await User.findOne({where:{id: user_id}})
    if(!user){
        res.status(404).send('User Not Found')
        return
    }
    user.profile_image = nova_img_url
    await user.save()
    res.status(200).send(user)
}

export {pegar_usuario, listar_usuarios, deletar_usuario, trocar_img}