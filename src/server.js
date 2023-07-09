require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Albums plugin
const albums = require('./api/albums/index.js');
const AlbumsService = require('./services/postgres/AlbumsService.js');
const AlbumsValidator = require('./validator/albums/index.js');

// Songs plugin
const songs = require('./api/songs/index.js');
const SongsService = require('./services/postgres/SongsService.js');
const SongsValidator = require('./validator/songs/index.js');

// Users plugin
const users = require('./api/users/index.js');
const UsersService = require('./services/postgres/UsersService.js');
const UsersValidator = require('./validator/users/index.js');

// Authentication plugin
const authentications = require('./api/authentications/index.js');
const AuthenticationsValidator = require('./validator/authentications/index.js');
const AuthenticationsService = require('./services/postgres/AuthenticationsService.js');
const TokenManager = require('./tokenize/TokenManager.js');

// Playlists plugin
const playlists = require('./api/playlists/index.js');
const PlaylistsValidator = require('./validator/playlists/index.js');
const PlaylistsService = require('./services/postgres/PlaylistsService.js');

// Collaborations plugin
const collaborations = require('./api/collaborations/index.js');
const CollaborationsValidator = require('./validator/collaborations/index.js');
const CollaborationsService = require('./services/postgres/CollaborationsService.js');

const init = async () => {
  const collaborationsService = new CollaborationsService();
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistsService = new PlaylistsService(collaborationsService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // External plugins registration
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // Definition of JWT authentication
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: CollaborationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
