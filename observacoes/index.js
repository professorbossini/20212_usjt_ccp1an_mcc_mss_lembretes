const express = require ('express')
const bodyParser = require ('body-parser')
const {v4: uuidv4} = require ('uuid')
const axios = require ('axios')
const app = express()
app.use(bodyParser.json())

const observacoesPorLembreteId = {}

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = 
            observacoesPorLembreteId[observacao.lembreteId]
        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status
        axios.post('http://localhost:10000/eventos', {
            tipo: 'ObservacaoAtualizada',
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        })
    }
}


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
    try{
        console.log (req.body)
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (e){ }
    res.status(204).end()
})

app.listen (5000, () => console.log ("Observações. Porta 5000."))