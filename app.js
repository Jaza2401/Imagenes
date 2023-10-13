const express = require('express')
const {PrismaClient} = require('@prisma/client')
const multer = require('multer')


const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hola mundo')
})

app.post('/post', async(req, res)=>{
    const {title, content, name, img} = req.body
    const result = await prisma.post.create({
        data: {
            title, content, name, img
        }
    })
    res.json(result)
})

app.get('/posts', async(req, res)=>{
    const posts = await prisma.post.findMany()
    res.json(posts)
})

app.put('/post/:id', async(req, res)=>{
    const {id}= req.params
    const {title, content} = req.body
    const post = await prisma.post.update({
        where: {id: Number(id)},
        data: {title, content}
    })
    res.json(post)
})

const storage = multer.memoryStorage()
  
const upload = multer({ storage: storage })
  
// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('pic'), async (req, res) => {
    console.log(req.file)
    if (req.file) {
        try {
        // Utiliza Prisma para guardar los detalles de la imagen en la base de datos
        const newImage = await prisma.post.create({
            data: {
            title:"Titulo",
            content:"hola",
            name: req.file.originalname,
            img: Buffer.from(req.file.buffer), // Convierte el buffer en Bytes para almacenar en Prisma
            }
        });

        // La imagen se ha guardado en la base de datos
        console.log('Imagen guardada en la base de datos:', newImage);
        res.sendStatus(200);
        } catch (error) {
        // Hubo un problema al guardar la imagen en la base de datos
        console.error('Error al guardar la imagen en la base de datos:', error);
        res.sendStatus(500);
        }
    } else {
        // Hubo un problema con la carga de la imagen
        res.sendStatus(400);
    }
})

app.get('/img/:id', async (req, res) => {
    const id = req.params.id;
    const image = await prisma.post.findUnique({  // Cambiar 'prisma.post.findUnique' a 'prisma.imagen.findUnique'
        where: { id: Number(id) },
    })

    if (image) {
        const imgBuffer = image.img; // Recuperar el campo de la imagen en formato de buffer
        const contentType = 'image/png'; // Cambiar esto según el tipo de imagen que estés almacenando
        console.log('hola')
        // Configurar la respuesta con el tipo de contenido adecuado
        res.type(contentType);
        res.end(imgBuffer);
    } else {
        res.end('No Img with that Id!');
    }
})

  
app.listen(3000, ()=>
    console.log('Server ready at: http://localhost:3000')
)
