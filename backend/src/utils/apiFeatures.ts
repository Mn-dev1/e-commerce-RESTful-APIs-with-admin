import express from 'express'
import type mongoose from 'mongoose'
import { Model } from 'mongoose'

class ApiFeatures {
    // constructor(mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']){
    //     // this.mongooseQuery = mongooseQuery,
    //     // this.queryString = queryString
    // }
    static paginate(mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        const page = parseInt(queryString.page as string) || 1
        const limit = parseInt(queryString.limit as string) || 12
        const skip = (page - 1) * limit
        mongooseQuery = mongooseQuery.skip(skip).limit(limit) //.populate({ path: 'category', select: 'designation' })
    }

    static filter(model: Model<any>, mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        const queryStringObj = { ...queryString }
        //const prix = parseInt(queryString.prix as string)

        // filtration b gte ...
        //filtre object {prix: {$lte: 70000}, ratingForEx:{}}
        //in postman ?prix[lte]=70000&ratingForEx...
        //kayen mouchkil hna fel filtration b sebet url encoding [] mayeglebhach nested object, 3andha 3ala9a bel front
        const excludedFields = ['page', 'limit', 'sort', 'fields']
        excludedFields.forEach(el => delete queryStringObj[el])
        // 3la jal gte ....
        let queryStr = JSON.stringify(queryStringObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        mongooseQuery = model.find(JSON.parse(queryStr))
    }

    static sort(mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        mongooseQuery = mongooseQuery.sort(queryString.sort as string)
    }

    static fieldsLimiting(mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        let fields = queryString.fields as string
        mongooseQuery = mongooseQuery.select(fields.split(','))
    }

    static search(model: Model<any>, mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        let query = {}
        query = {
            $or: [
                { designation: { $regex: queryString.keyword, $options: 'i' } },
                { description: { $regex: queryString.keyword, $options: 'i' } }
            ]
        }
        mongooseQuery = model.find(query)
    }
}

export default ApiFeatures