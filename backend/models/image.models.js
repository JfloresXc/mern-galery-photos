import { model, Schema } from 'mongoose'

const Image = new Schema({
    name: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    imgUrl: {
        type: String
    }
}, {
    timestamps: true
})

Image.methods.setImgUrl = function (filename){
    const { PORT, HOST } = process.env
    this.imgUrl = `${HOST}:${PORT}/public/uploads/${filename}`
}

export default model('images', Image)