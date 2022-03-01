const { AuthenticationError } = require('apollo-server-express');
const { User, Fandom } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userFound = await User.findOne({ _id: context.user._id }).select("-__v -password").populate('matches').populate('fandoms');
        console.log(userFound)
        console.log(context.user)

        return userFound
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    fandoms: async () => {
      return Fandom.find();
    },

    users: async () => {
      return User.find().populate('fandoms');
    },


  },

  Mutation: {
    addUser: async (parent, { username, email, password, firstName, lastName }) => {
      const user = await User.create({ username, email, password, firstName, lastName });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addFandom: async (parent, args, context) => {
      // if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
              { _id: args._id },
              { $addToSet: { fandoms: { _id: args.fandomId } } },
              { new: true, runValidators: true }
          );
      // }
      return updatedUser; 
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
    },

    removeFandom: async (parent, args, context) => {
      // if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: args._id },
            { $pull: { fandoms: args.fandomId } },
            { new: true, runValidators: true }
        );
        return updatedUser;
        // if (!updatedUser) {
        //     return res.status(404).json({ message: "Couldn't find user with this id!" });
        //   }
      // }

      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
    },

    addMatch: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { matches: { _id: args._id } } },
              { new: true, runValidators: true }
          ).populate('matches').populate('fandoms');
          return updatedUser ; 
      }
        
      
      throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
    },
    
    removeMatch: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { matches: args._id } },
              { new: true, runValidators: true }
          ).populate('matches').populate('fandoms');
          return updatedUser;
      }
          
      // throw new AuthenticationError('You need to be logged in!');
      // { _id: context.user._id },
      // { $push: { fandoms: args.fandomId } },
    }, 
      
      

  },

  
  
};

module.exports = resolvers;
