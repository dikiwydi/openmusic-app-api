const AlbumsHandler = require('./handler.js');
const routes = require('./routes.js');

const albumsPlugin = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumsHandler(service, validator);
    server.route(routes(albumHandler));
  },
};

module.exports = albumsPlugin;
