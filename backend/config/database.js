const mongoose = require('mongoose')
const URI = 'mongodb://localhost/images'

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected')
    }).catch(e => {
        console.error(e)
    })

