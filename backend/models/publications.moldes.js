import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

const Publication = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

export default model('publications', Publication)