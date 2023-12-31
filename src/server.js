/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums/index.js');
const songs = require('./api/songs/index.js');
const AlbumService = require('./services/postgres/AlbumService.js');
const AlbumValidator = require('./validator/albums/index.js');
const SongService = require('./services/postgres/SongService.js');
const SongValidator = require('./validator/songs/index.js');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
