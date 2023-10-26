let mysql=require('mysql');
let express=require('express');

let app = express(); 
app.use(express.json());
app.listen('3000', function(){
    console.log('Servidor OK');
})
app.get('c:\Users\sena1\Desktop\API', function(req,res){
    res.send('c:\Users\sena1\Desktop\API');
})

let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosdb'
});
// Probar la conexión
conexion.connect(function(error){
   if(error){
       throw error;
   } else{
       console.log('Conexión exitosa');
   }
});

app.get('/API/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

app.get('/API/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id=?', [req.params.id] , (error,fila)=>{
        if(error){
            throw error;
        }else{
             res.send(fila);
           res.send(fila[0].descripcion);  // para traer un solo resgistro “ descripción”
        }
    });
});


app.post('/API/articulos',(req,res)=>{
    let data = {id:req.body.id, descripcion:req.body.descripcion, precio:req.body.precio};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error,results){
        if(error){
            throw error;
        }else{
           res.send(results);     
        }
    });
});

app.put('/API/articulos',(req,res)=>{
    let data = {id:req.body.id, descripcion:req.body.descripcion, precio:req.body.precio};
    let sql = "SELECT * FROM articulos UPDATE WHERE id=?";
    conexion.query(sql, data, function(error,results){
        if(error){
            throw error;
        }else{
           res.send(results);     
        }
    });
});