export enum Errors{
    UserExists="UserExists",
    FileError="FileError"
}
export class UserExists extends Error{
     constructor(...args:any){
         super(args);
         this.name=Errors.UserExists
     }
}

export class FileError extends Error{
    constructor(message:string){
        super(message);
        this.name=Errors.FileError
    }
}