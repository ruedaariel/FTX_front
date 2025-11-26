//el objeto Request de Express tiene dos propiedades adicionales: idUser y rolUser
declare namespace Express {
    interface Request {
        idUser : string;
        rolUser: string;
        emailUser: string;
    }
}