import express from 'express'
import { pegarTodosArtistas, pegarArtistaPorId } from '../controlador/controlador_artista.js';

const rotas_artistas = express.Router();

rotas_artistas.get('/', pegarTodosArtistas);
rotas_artistas.get('/:id', pegarArtistaPorId);  

export {rotas_artistas};