import express from "express"
import commandeRouter from './commande.routes.js'
import productRouter from './product.routes.js'
import categoryRouter from './category.routes.js'
import adminRouter from './admin.routes.js'
import panierRouter from "./panier.routes.js"
import clientRouter from "./client.routes.js"
import authRouter from "./auth.routes.js"

const mountRoutes = (app: express.Application) => {
    app.use('/api/v1/panier', panierRouter)
    app.use('/api/v1/commandes', commandeRouter)
    app.use('/api/v1/products', productRouter)
    app.use('/api/v1/admins', adminRouter)
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/clients', clientRouter)
    app.use('/api/v1/auth', authRouter)
}
export default mountRoutes