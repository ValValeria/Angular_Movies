/*
let express=require('express')
let app=express();
let bodyParser=require('body-parser')
const Sequelize = require("sequelize");
const sequelize = new Sequelize("C5CTjjXhqo", "C5CTjjXhqo", "Eu6f3raCnq", {
  dialect: "mysql",
  host: "remotemysql.com",
  port:3306,
  define: {
    timestamps: false
  }
});


const path=require('path')
const os=require('os')
const file_dest=path.dirname(path.dirname(__dirname))
const multer=require('multer');
const upload=multer({
    storage:multer.diskStorage({
        destination: function (_req, _file, cb) {
            cb(null, path.join(file_dest,'public'))
        },
        filename: function (_req, file, cb) {
            cb(null,  Math.round(Math.random())+file.originalname)
        }
    })
})

const fs=require('fs')

const usermodel=require('./User.model.ts').User
const User=usermodel(Sequelize,sequelize)

const postmodel=require('./Post.model.ts').Post
const Post=postmodel(Sequelize,sequelize)

Post.belongsTo(User,{as:'user'})
User.hasMany(Post,{as:'post'})

app.use(bodyParser.json())


app.use((_req,res,next)=>{
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    res.set("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" );
    res.set("Access-Control-Allow-Credentials", "true" );
    next()
})

sequelize.sync().then().catch(err=> console.log(err));

app.get('*',(req,resp,next)=>{
     const path_file=path.join(path.dirname(path.dirname(__dirname)),req.url);
     fs.access(path_file,fs.constants.R_OK,(err)=>{

         if(err) return next();
         
         const extname=ext(path.extname(path_file).slice(1))
         if(extname){
            resp.set('Content-Type',extname)
            resp.sendFile(path_file)
         }
     })

})

app.post('/users',(req,res)=>{
    const json : {name:string,password:string,email:string}=req.body;
    const messages:any={status:null,errors:[]}

    User.findOne( {where:{name:json.name}})
    .then((result)=>{
      if(result){
          console.log('taken')
          messages.errors.push("Your name is taken")
        }
        return   User.findOne({where:{email:json.email}})
    })
    .then((result)=>{

        if(result){
            console.log('taken')
            messages.errors.push("Your email is taken")
        }
        return Promise.resolve();
    })
    .then(()=>{

        if(messages.errors.length==0){
            return   User.create(Object.assign(json,{post_id:0}))
        }
        return  Promise.reject();
    })
    .then((_result)=>{
        messages.status="user"
        res.send(JSON.stringify(messages))
     })
    .catch(_err=>{
        console.log(_err)
        res.send(JSON.stringify(messages))
        res.end()
    })
})

app.post('/status_of_user',(req,res)=>{
    let json=JSON.parse(req.get('Authorization'));
    User.findOne({where:{name:json.name,email:json.email}})
    .then((result)=>{
      if(result){
          res.json({status:'user'})
      }else{
          res.json({status:'guest'})
      }     
    })
    .catch(()=>{
          res.json({status:'guest',error:true})
    })
    .finally(()=>{
         res.end()
    })
})

app.post('/addpost',upload.single('videoUrl'),function (req,resp){
       const file=req.file//destination , 

       const filepath=file.path

       const data=req.body;
       const auth=JSON.parse(req.get('Authorization'))
       let message:{status:string,id:number}={status:null,id:null};

       Promise.resolve()
       .then(()=>{
           return User.findOne({where:{name:auth.name,email:auth.email}})
       })
       .then((result)=>{
           if(result){
               return Promise.resolve(result.id)
           }
           return Promise.reject('Not auth')
       })
       .then((id)=>{
           if(!file.mimetype.includes('video') || !fs.existsSync(filepath) ) return Promise.reject('Mime type error');
           return Promise.resolve(id);
        })
       .then(()=>{
          return User.findOne({where:{name:auth.name}}).then(result=>{
              return Post.create({name:data.name,p1:data.p1,videoUrl:`/public/${file.filename}`,userId:result.id})
          })
       })
       .then((post)=>{
           message.status='Added'
           message.id=post.id
           resp.json(message)
           return Promise.resolve();
       })
       .catch((error)=>{
           resp.json(message)
           resp.end();
           console.log(error)
       })
       .finally(()=>{
           resp.end()
       })
      
})
app.get('/post',(req,resp)=>{
    Post.findOne({where:{id:req.query.id},include:[{all:true}]})
    .then((result)=>{
        if(result){
            return resp.json(result)
        }
        return resp.status(200)
    })
    .catch((error)=>{
        console.log(error.message)
        resp.status(500);
        resp.end()
    })
})


app.get('/posts',(req,resp)=>{
    Post.findAll({limit:5,include:[{model:User,as:'user',attributes:['name','id']}] })
    .then(result=>{
        if(result) return resp.json(result);
    })
    .catch(_error=>{
        console.log(_error.message)
        resp.status(500)
    })
    .finally(()=>{
        resp.end();
    })
})

app.listen(8000,()=>{
    console.log('app is running')
})


app.get('/channels',(req,resp)=>{
    User.findAll({limit:6})
    .then((res1)=>{
        return new Promise((resolve,rej)=>{
            async function* generate(res1:{id:number,dataValues:any}[]){
                for(let user of res1){
                    yield Post.findAll({where:{userId:user.id}})
                          .then((result)=>{
                              return result.map(result=>{
                                  return result.dataValues;
                              })
                          })
                          .then((some)=>{
                              return Promise.resolve(Object.assign({},{user:user.dataValues,posts:some}))
                          })
                }
            }
            (async()=>{
                let array=[]
                for await(let user_data of generate(res1)){
                   array.push(user_data)
                }
                setTimeout(()=>{resolve(array)},0)
            })()
        })
    })
    .then((data)=>{
        resp.send(data)
    })
    .catch((err)=>{
        console.log(err)
        resp.status(500)
    })
})

/**
 * Functions
 
function ext(extame:string){
    if(extame=='mp4'){
        return 'video/mp4'
    }
    return false;
  }
  */