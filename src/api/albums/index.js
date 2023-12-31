// eslint-disable-next-line import/extensions
const AlbumHandler = require('./handler.js');
// eslint-disable-next-line import/extensions
const routes = require('./routes.js');

const albumPlugin = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);
    server.route(routes(albumHandler));
  },
};

module.exports = albumPlugin;
