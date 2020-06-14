export function c(promise:Promise<any>,res:{status:Function}):Promise<any>{
     return promise.catch(err=>{res.status(500);console.log(err)})
}