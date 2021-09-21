const express = require ('express')
const bodyParser = require ('body-parser')
const {v4: uuidv4} = require ('uuid')
const app = express()
app.use(bodyParser.json())

const observacoesPorLembreteId = {}

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post ('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    const { texto } = req.body
    const idLembrete = req.params.id
    const observacoesDoLembrete = observacoesPorLembreteId[idLembrete] || []
    observacoesDoLembrete.push({id: idObs, texto})
    observacoesPorLembreteId[idLembrete] = observacoesDoLembrete
    res.status(201).send(observacoesDoLembrete)
})

app.listen (5000, () => console.log ("Observações. Porta 5000."))