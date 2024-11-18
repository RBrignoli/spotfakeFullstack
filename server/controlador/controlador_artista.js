
import {Artista, Album, Musica} from '../db.js'

const pegarTodosArtistas = async (req, res) => {
  try {
    const artists = await Artista.findAll();
    return res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar artistas' });
  }
};

const pegarArtistaPorId = async (req, res) => {
  try {
    const artist = await Artista.findByPk(req.params.id, {
      include: [{
        model: Album,
        as: 'Albums',
        include: [{model: Musica, as: 'Musicas'}]  // Incluir músicas no álbum
      }]
    });
    if (!artist) {
      return res.status(404).json({ error: 'Artista não encontrado' });
    }
    return res.status(200).json(artist);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao buscar artista' });
  }
};


export {pegarTodosArtistas, pegarArtistaPorId}