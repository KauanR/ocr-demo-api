const express = require('express')
const cors = require('cors')
const Tesseract = require('tesseract.js')
const { createWorker } = require('tesseract.js')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/', async(req, res) => {
    const { url, lang } = req.body

    try {
        const worker = createWorker({
            logger: log => console.log(log)
        })

        await worker.load()
        await worker.loadLanguage(lang)
        await worker.initialize(lang)

        const { data: { text } } = await worker.recognize(url)

        return res.status(200).json({text})
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }
})

app.listen(3333)