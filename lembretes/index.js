const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
//middleware, permite acessar o corpo (req.body) e tratá-lo como um objeto JSON
app.use(bodyParser.json())

const lembretes = {}
contador = 0

app.get('/lembretes', (req, res) => {
    res.status(200).send(lembretes)
})

app.post ('/lembretes', (req, res) => {
    contador++
    const {texto} = req.body
    lembretes[contador] = {contador: contador, texto: texto}
    res.status(201).send(lembretes[contador])
})
app.listen (4000, () => console.log ("Lembretes. Porta 4000"))