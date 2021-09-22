const express = require('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = {
            contador: lembrete.contador, texto: lembrete.texto
        }
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes'] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
    }
}

app.post ('/eventos', (req, res) => {
    funcoes[req.body.tipo](req.body.dados)
    res.status(200).send(baseConsulta)
    
})

app.get('/lembretes', (req, res) => {
    res.status(200).send(baseConsulta)
})

app.listen (6000, () => console.log ("Consulta. Porta 6000"))