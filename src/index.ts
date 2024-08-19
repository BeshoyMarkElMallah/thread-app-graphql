import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from './graphql'

async function init() {

    const app = express();
    const PORT = Number(process.env.PORT) || 8000


    app.use(express.json())

    // Create Graphql Server
    const gqlServer = await createApolloGraphqlServer();


    app.get('/', (req, res) => {
        res.json({
            message: 'Server is up and running'
        })
    })

    app.use('/graphql', expressMiddleware(gqlServer));


    app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`)
    )
}

init()