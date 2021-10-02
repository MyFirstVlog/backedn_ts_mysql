import {DataTypes } from "sequelize";
import db from '../../db/connection';

const Usuario = db.define('Usuario', {
    nombre : {
        type: DataTypes.STRING
    },
    email : {
        type: DataTypes.STRING
    },
    estado : {
        type: DataTypes.BOOLEAN // aunque los puse coomo tinyint sequelize se encargara de transformarlos como 1's y 0's
    }
})


export default Usuario