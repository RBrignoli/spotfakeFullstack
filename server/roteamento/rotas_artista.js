import express from 'express'
import { pegarTodosArtistas, pegarArtistaPorId, pegarAlbumsPorArtista } from '../controlador/controlador_artista.js';

const rotas_artistas = express.Router();

rotas_artistas.get('/', pegarTodosArtistas);
rotas_artistas.get('/:id', pegarArtistaPorId);
rotas_artistas.get('/:id/albums/', pegarAlbumsPorArtista);  


export {rotas_artistas};