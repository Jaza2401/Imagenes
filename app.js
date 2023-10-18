import Express from 'express'
import router from "./routes/index.js"
import bodyParser from 'body-parser'

const app = Express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router)

app.listen(3001, ()=>{
    console.log('Server ready at: http://localhost:3001')
})
