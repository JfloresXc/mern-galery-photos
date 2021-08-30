const fileMiddleware = (req, res, next) => {
    if (req.files) {
        const file = req.files.file
        if (file.size > (1024 * 1024)) {
            return res.json({ message: 'File size limit has been reached' })
        }
        next()
    } else return res.json({ message: 'File not found' })
}

export {
    fileMiddleware
}