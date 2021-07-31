const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLDate, GraphQLList, GraphQLInterfaceType, GraphQLInt, GraphQLFloat } = require('graphql');

const User = require('../models/user');

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'user',
    fields: () => ({
        username: { 
            type: GraphQLString,
            resolve: async (user) => {
                username = await user.username;
                return username;
            }
         },
        email: {
            type: GraphQLString,
            resolve: async (user) => {
                email = await user.email;
                return email;
            }
         },
        phone: { 
            type: GraphQLString,
            resolve: async (user) => {
                phone = await user.phone;
                return phone;
            }
         },
        createdAt: { 
            type: GraphQLFloat,
            resolve: async (user) => {
                createdAt = new Date(await user.createdAt);
                return createdAt;
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'root query', 
    
    fields: () => ({
        users: {
            type: new GraphQLList(userType),
            description: 'List of users',
            resolve: async () => {
                let users = await User.find();
                console.log(users);
                return users;
            }
        },
        user: {
            type: userType,
            description: 'One user',
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: async (parent, args) => {
                let user = await User.findOne({ _id: args.id });
                return user;
            }
        }
    })
})

module.exports.Schema = new GraphQLSchema({
    query: RootQuery
})