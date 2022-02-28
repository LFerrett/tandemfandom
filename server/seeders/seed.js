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
    const allFandoms = await Fandom.find({})
    const allUsers = await Users.find({})


    // const fandomIds = allFandoms.map(fandom => fandom._id)
    // console.log(fandomIds)
    // for (let index = 0; index < allUsers.length; index++) {
    //   const singleUser = allUsers[index];
    //   singleUser.fandoms.push(fandomIds[Math.floor(Math.random() * fandomIds.length)])
    //   console.log(singleUser)
    // }
    // math.random on fandomIds[random]

  

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});