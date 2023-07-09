const PlaylistsHandler = require('./handler');
const routes = require('./routes');

const playlistsPlugin = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, songsService, validator }) => {
    const playlistHandler = new PlaylistsHandler(playlistsService, songsService, validator);
    server.route(routes(playlistHandler));
  },
};

module.exports = playlistsPlugin;
