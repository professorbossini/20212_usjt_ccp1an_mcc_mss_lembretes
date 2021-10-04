const express = require ('express')
const app = express()
app.use(express.json())
const palavraChave = "importante"
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = 
        observacao.texto.includes(palavraChave)
        ? "importante"
        : "comum"
        axios.post('http://localhost:10000/eventos', {
            tipo: "ObservacaoClassificada",
            dados: observacao
        })
    }
}
app.post('/eventos', (req, res) => {
    // req.body: {tipo: ObservacaoCriada, dados: {id: 1, texto: 'abc'}}
    funcoes[req.body.tipo](req.body.dados)
})

app.listen(7000, () => console.log ("Classificação. Porta 7000."))