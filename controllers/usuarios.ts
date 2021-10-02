import { Request, Response } from 'express';
import Usuario from '../dist/models/usuario';


export const getUsuarios = async (req :Request,res : Response) => {

        const usuarios = await Usuario.findAll()

        res.json(usuarios)
}

export const getUsuario = async (req :Request,res : Response) => {
    const {id} = req.params

    const usuario = await Usuario.findByPk(id)

    if(!usuario){
        return res.status(404).json({
            msg : 'El usuario solocitado no esta en la base de datos'
        })
    }
    res.json({usuario})
}

export const postUsuario = async (req :Request,res : Response) => {
    const {body} = req

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email : body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: 'Email existe en al base de datos'
            })
        }
        const usuario = Usuario.build(body)
        await usuario.save()

        res.status(201).json({
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Internal Error'
        })
    }

}

export const putUsuario = async (req :Request,res : Response) => {
    const {id} = req.params
    const {body} = req

    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(400).json({
                msg : 'no existe el usuario'
            })
        }

        await usuario.update( body );

        res.json({usuario})


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Internal Error'
        })
    }
 
}

export const deleteUsuario = async (req :Request,res : Response) => {
    const {id} = req.params

    const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(400).json({
                msg : 'no existe el usuario'
            })
        }
    
    await usuario.update({estado:false})

    //    await usuario.destroy() //fisicamente es elimiado

    res.json({
        msg : 'Uusario eliminado de manera correcta' , 
        usuario
    })
}