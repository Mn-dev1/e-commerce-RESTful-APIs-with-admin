import express from 'express'
import type mongoose from 'mongoose'

class ApiFeatures {
    mongooseQuery: mongoose.Query<any, any>
    queryString: express.Request['query']

    constructor(mongooseQuery: mongoose.Query<any, any>, queryString: express.Request['query']) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }
    paginate() {
        const page = parseInt(this.queryString.page as string) || 1
        const limit = parseInt(this.queryString.limit as string) || 12
        const skip = (page - 1) * limit
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit) //.populate({ path: 'category', select: 'designation' })
        return this
    }

    filter() {
        const queryStringObj = { ...this.queryString }
        //const prix = parseInt(queryString.prix as string)

        // filtration b gte ...
        //filtre object {prix: {$lte: 70000}, ratingForEx:{}}
        //in postman ?prix[lte]=70000&ratingForEx...
        //kayen mouchkil hna fel filtration b sebet url encoding [] mayeglebhach nested object, 3andha 3ala9a bel front
        const excludedFields = ['page', 'limit', 'sort', 'fields', 'keyword']
        excludedFields.forEach(el => delete queryStringObj[el])
        // 3la jal gte ....
        let queryStr = JSON.stringify(queryStringObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
        return this
    }

    sort() {
        if (this.queryString.sort)
            this.mongooseQuery = this.mongooseQuery.sort(this.queryString.sort as string)
        else
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt')
        return this
    }

    fieldsLimiting() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields as string
            this.mongooseQuery = this.mongooseQuery.select(fields.split(','))
        }
        else
            this.mongooseQuery = this.mongooseQuery.select(["-__v"])

        return this
    }

    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery = this.mongooseQuery.find({
                $or: [
                    { designation: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } }
                ]
            })
        }
        return this
    }
}

export default ApiFeatures