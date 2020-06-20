export function c(promise:Promise<any>,res:{status:Function}):Promise<any>{
     return promise.catch(err=>{console.log(err)})
}