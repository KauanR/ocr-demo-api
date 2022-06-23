const express = require('express')
const cors = require('cors')
const Tesseract = require('tesseract.js')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/', async(req, res) => {
    const { url, lang } = req.body

    try {
        await Tesseract.recognize(url, lang, { logger: log => console.log(log) })
            .then(({ data: { text } }) => {
                return res.status(200).json({text})
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({err})
            })
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }
})

app.listen(3333)