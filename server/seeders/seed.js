const db = require('../config/connection');
const { User, Fandom } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const fandomSeeds = require('./fandomSeeds.json')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Fandom.deleteMany({});
    await User.create(profileSeeds);
    await Fandom.create(fandomSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});