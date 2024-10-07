import { UserDataToken } from "@/middlewares/auth/interface/UserDataToken";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const CreateUserAuthC = (req:Request, res:Response):void => {
    console.log("Creando el usuario desde Auth0");
    
    try {
        
        const userData:UserDataToken = res.locals["userData"];
        console.log("USER DATA" + JSON.stringify(userData));
        
        res.status(200)
    } catch (error) {
        
    }

}

export const authUserController = {
    CreateUserAuthC
};