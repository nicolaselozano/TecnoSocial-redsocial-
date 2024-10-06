import { Request, Response } from "express";

const CreateUserAuthC = (req:Request, res:Response):void => {
    console.log("Creando el usuario desde Auth0");
    
    try {
        
        const userData = res.locals["userData"];
        console.log(userData);
        

    } catch (error) {
        
    }

}

export const authUserController = {
    CreateUserAuthC
};