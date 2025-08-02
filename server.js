const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do CORS para permitir solicitações de qualquer origem
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

let produtos = [
  { id: 1, nome: 'Produto 1', preco: 10.0, disponivel: true },
  { id: 2, nome: 'Produto 2', preco: 20.0, disponivel: false },
];
let nextId = 3;

// Listar todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Detalhar um produto
app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Inserir um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco, disponivel } = req.body;
  const novoProduto = { id: nextId++, nome, preco, disponivel };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Atualizar um produto
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco, disponivel } = req.body;
  const produto = produtos.find(p => p.id === id);
  if (produto) {
    produto.nome = nome;
    produto.preco = preco;
    produto.disponivel = disponivel;
    res.json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Remover um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
