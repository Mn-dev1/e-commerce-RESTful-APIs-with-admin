class CustomError extends Error {
    statusCode: number
    status: string
    isOperational: boolean
    constructor(message: Error["message"], statusCode: number){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true // true ya3ni ana ba2dar etnaba2 bih true ya3ni ana li b3atou na7tajha f dev
    }
}
export default CustomError