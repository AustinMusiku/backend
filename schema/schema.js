const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLDate, GraphQLList } = require('graphql');

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
        password: { 
            type: GraphQLString,
            resolve: async (user) => {
                password = await user.password;
                return password;
            }
         },
        phone: { 
            type: GraphQLString,
            resolve: async (user) => {
                phone = await user.phone;
                return phone;
            }
         },
        // createdAt: { 
        //     type: GraphQLDate,
        //     resolve: (user) => {
        //         user.createdAt
        //     }
        //  }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'root query', 
    
    fields: () => ({
        users: {
            type: new GraphQLList(userType),
            description: 'list of users',
            resolve: async () => {
                let users = await User.find();
                console.log(users);
                return users;
            }
        }
    })
})

module.exports.Schema = new GraphQLSchema({
    query: RootQuery
})