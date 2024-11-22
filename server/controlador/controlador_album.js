
import { Artista, Album, Musica } from '../db.js'
import { Sequelize } from 'sequelize';

const pegarTodosAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    return res.status(200).json(albums);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar albums' });
  }
};

const pegarAlbumPorId = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [{
        model: Musica,
        as: 'Musicas'
      }]
    });
    if (!album) {
      return res.status(404).json({ error: 'Album não encontrado' });
    }
    return res.status(200).json(album);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao buscar album' });
  }
};

const pegarMusicaPeloAlbum = async (req, res) => {
  try {
    const musicas = await Musica.findAll({ where: { album_id: req.params.id } }
    );
    if (!musicas) {
      return res.status(404).json({ error: 'Album não encontrado' });
    }
    return res.status(200).json(musicas);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao buscar albums' });
  }
};

const getMaisOuvidas = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      order: [
          [Sequelize.fn('RANDOM')]  
      ],
      limit: 5,
      include: [{
        model: Artista,
        attributes: ['id', 'nome']
      },
      {
        model: Album,
        attributes: ['id', 'coverImageUrl', 'title']
      }]
  })
    return res.json(musicas);
  } catch (error) {
    console.error('Erro ao buscar itens aleatórios:', error);
    return res.status(500).json({ error: 'Erro ao buscar itens aleatórios' });
  }
};


export { pegarTodosAlbums, pegarAlbumPorId, pegarMusicaPeloAlbum, getMaisOuvidas }