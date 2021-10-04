const express = require ('express')
const bodyParser = require ('body-parser')
const {v4: uuidv4} = require ('uuid')
const axios = require ('axios')
const app = express()
app.use(bodyParser.json())

const observacoesPorLembreteId = {}

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post ('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4()
    const { texto } = req.body
    const idLembrete = req.params.id
    const observacoesDoLembrete = observacoesPorLembreteId[idLembrete] || []
    observacoesDoLembrete.push({id: idObs, texto, status: "Aguardando"})
    observacoesPorLembreteId[idLembrete] = observacoesDoLembrete
    await axios.post ('http://localhost:10000/eventos', {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id, status: "Aguardando"
        }
    })
    res.status(201).send(observacoesDoLembrete)
})

app.post('/eventos', (req, res) => {
    console.log (req.body)
    res.status(204).end()
})

app.listen (5000, () => console.log ("Observações. Porta 5000."))