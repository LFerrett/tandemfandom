const db = require('../config/connection');
const { User } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const fandomSeeds = require('./fandomSeeds.json')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(profileSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(fandomSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});