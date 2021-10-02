import {Sequelize} from "sequelize";

const db = new Sequelize('curso-node','alejo' , '12345',{
    host: 'localhost',
    dialect: 'mysql',
    //logging :false
})

export default db