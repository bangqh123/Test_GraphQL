const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

const mongoDataMethods = require('./db/db')

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://bang123:1234@grapql.zjajtw9.mongodb.net/?retryWrites=true&w=majority', {
			useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('🚀🚀🚀 Mongoose conected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

mongoose.set("strictQuery", false)
connectDB()

async function startServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers, context: () => ({ mongoDataMethods })})
    const app = express();
    await server.start();
    server.applyMiddleware({app});
    
    app.listen({port:4000}, () => {
        console.log(`🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })
}

startServer(typeDefs, resolvers)