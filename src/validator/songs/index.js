const InvariantError = require('../../exceptions/InvariantError.js');
const SongsPayloadScheme = require('./schema.js');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongsPayloadScheme.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
