import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import compression from 'compression'
// import cors from 'cors'
import morgan from 'morgan'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import connectDB from './db/connect.js'
import CustomError from './errors/CustomError.js'
import mountRoutes from './routes/index.js'

const app = express() 

//middleware before routes 
app.use(express.json())
// app.use(cors({
//     credentials: true,
// }))
// app.use(compression())
// app.use(cookieParser())
app.use(bodyParser.json())

if(process.env.NODE_ENV === 'development') // w kayen staging mode ki tala3 code f charika w wa7ed okhor ya5dem 3lih
    app.use(morgan('dev'))
    
app.use(cookieParser())

mountRoutes(app)
app.all('*splat', (req, res, next) => {
    next(new CustomError(`route ${req.url} not found`, 404))
})
// this middleware handle errors inside express 
app.use(errorHandlerMiddleware)

try {
    await connectDB(process.env.MONGO_URI as string)
    const server = app.listen(process.env.PORT, () => {
        console.log(`server running on http://localhost:${process.env.PORT}/`)
    })

    // hadi ji bara try, nrigel format ta3 l msg w n5alih yetla3 ll user mch fel console w server maya7besch bech ki nbedel mana7tajech ndir restart l server
    process.on('unhandledRejection', (err: Error) => {
        console.error(`unhandledRejection Error: ${err.name} | ${err.message}`)
        server.close(() => {
            process.exit(1)
    })
    
})
    
} catch (error) {
    console.log(error);
}
//DB li net3amel m3aha fel devlopment mode mch nafseha ta3 production mode

// async w kayen ta3 sync ms madarhach psq matesrach bzf
// matemchich 7atan nrigel try w catch












