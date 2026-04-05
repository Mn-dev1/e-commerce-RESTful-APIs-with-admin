import {connect} from 'mongoose'

const connectDB = async (uri: string) => {
    try {
        await connect(uri)
        console.log('MongoDB connected ...');
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error')
        
    }
}
export default connectDB