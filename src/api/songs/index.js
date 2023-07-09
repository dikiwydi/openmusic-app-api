const routes = require('./routes.js');
const SongsHandler = require('./handler.js');

const songsPlugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new SongsHandler(service, validator);
    server.route(routes(songHandler));
  },
};

module.exports = songsPlugin;
