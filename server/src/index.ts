import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { schema } from "./Schema";
import { Users } from './Entities/User';

// Se utilizará base de datos crudgraphql, hecha en MySQL.

const main = async () => {
    new DataSource({
        type: 'mysql',
        database: 'crudgraphql',
        username: 'root',
        password: 'password',
        logging: true,
        //Edta propiedad se debe setear a falso una vez que se guarde la entidad, borrar y al crear entidad nueva volver a crear.
        synchronize: true,
        entities: [Users]
    }).initialize();
}

const app = express();
app.use(cors());
app.use(express.json());

//Definición de ruta para pruebas en Graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3001, () => {
    console.log("Server is running on port 3001")
});

main().catch((err) => {
    console.log(err);
})