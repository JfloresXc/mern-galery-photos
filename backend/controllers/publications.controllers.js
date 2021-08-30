import { unlink } from 'fs'
import path from 'path'
import Publication from '../models/publications.moldes'
import Image from '../models/image.models'
import mongoose from 'mongoose'

const controller = {}
const MESSAGE_ERROR = 'Existe algun error'

controller.getPublications = async (req, res) => {
    try {
        const publications = await Publication.aggregate([
            {
                $lookup: {
                    from: "images",
                    localField: "image",
                    foreignField: "_id",
                    as: "publicationImage"
                }
            }, {
                // Sin esta propiedad el resultado del lookup(busqueda) nos da
                // un arreglo. Sin embargo, con este nos da un objeto en "publicationImage"
                $unwind: "$publicationImage"
            }
        ])
        res.json(publications)
    } catch (error) {
        res.json({ message: 'Get Publications - ' + MESSAGE_ERROR })
    }
}

controller.postPublicationsTitle = async (req, res) => {
    try {
        const { title } = req.body
        const publications = await Publication.aggregate([
            {
                $lookup: {
                    from: "images",
                    localField: "image",
                    foreignField: "_id",
                    as: "publicationImage"
                }
            },
            { $unwind: "$publicationImage" },
            { $match: { title } }
        ])
        res.json(publications)
    } catch (error) {
        res.json({ message: 'Get Publications For Title - ' + MESSAGE_ERROR })
    }
}

controller.postPublication = async (req, res) => {
    try {
        const file = req.files.file
        const { name, size, mimetype } = file

        const pathTemp = path.join(__dirname, '/../storage/uploads/' + name)
        await file.mv(pathTemp)

        const image = new Image({ name, mimetype, size })
        image.setImgUrl(name)
        const { _id } = await image.save()

        await Publication.create({
            ...req.body, image: _id
        })
        res.json({ message: 'File received' })
    } catch (error) {
        res.json({ message: 'Post Publication - ' + MESSAGE_ERROR })
    }
}

controller.getPublication = async (req, res) => {
    try {
        const { id } = req.params

        const publication = await Publication.aggregate([
            {
                $lookup: {
                    from: "images",
                    localField: "image",
                    foreignField: "_id",
                    as: "publicationImage"
                }
            },
            { $unwind: "$publicationImage" },
            { $match: { _id: mongoose.Types.ObjectId(id) } }
        ])
        res.json(publication)
    } catch (e) {
        res.json({ message: 'Get Publication - ' + MESSAGE_ERROR })
    }
}

controller.deletePublication = async (req, res) => {
    try {
        const { id } = req.params
        const { image } = await Publication.findById(id)
        const { name } = await Image.findById(image)
        const imagesFind = await Image.find({ name })

        await Publication.findByIdAndDelete(id)
        await Image.findByIdAndDelete(image)

        if (imagesFind.length === 1) unlink(`storage/uploads/${name}`, err => console.error(err))
        res.json({ message: 'Eliminado satisfactoriamente' })
    } catch (e) {
        res.json({ message: 'Delete Publication - ' + MESSAGE_ERROR })
    }
}

export default controller