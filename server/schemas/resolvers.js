const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
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
          await User.findOneAndUpdate(
              { _id: args._id },
              { $addToSet: { fandoms: {_id: args.fandomId } } },
              { new: true, runValidators: true }
          );
      // }
      
      // throw new AuthenticationError('You need to be logged in!');
      // { $push: { fandoms: args.fandomId } },
    },

   
    
  },
};

module.exports = resolvers;
