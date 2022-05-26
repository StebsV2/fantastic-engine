import prisma from "../prisma";
import { Request, Response } from "express";



export async function store(req : Request,res : Response){
    const data = req.body
    const newEntity = await prisma.todo.create({data}) 
    return res.json(newEntity);
}

export async function list(req : Request,res: Response){
    const todos = await prisma.todo.findMany() 
    return res.json(todos);
}

export async function show(req : Request,res : Response){
    const {id} = req.params
    const todo = await prisma.todo.findUnique({where: {id : parseInt(id)}}) 
    return res.json(todo);
}

export async function update(req : Request,res : Response) {
    let todo
    let status
    try{
        const {id} = req.params
        const data= req.body
        todo= await prisma.todo.update({
            where : {
                id: parseInt(id)
            },
            data : data
        })
        status=200
    }catch(err){
        status=400
        todo={msg: "ID non trovato"}
    }
    return res.status(status).json(todo)
}