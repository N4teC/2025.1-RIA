const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const JWT_SECRET = 'seu-jwt-secret-key-aqui'; // Em produção, use uma variável de ambiente

// Configuração do CORS para permitir solicitações de qualquer origem
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Usuários fictícios para autenticação
const usuarios = [
  { id: 1, email: 'admin@email.com', senha: '123456', nome: 'Administrador' },
  { id: 2, email: 'user@email.com', senha: '123456', nome: 'Usuário' }
];

// Middleware para verificar JWT
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Endpoint de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ 
    token,
    usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome }
  });
});

// Endpoint para verificar se o token é válido
app.get('/verificar-token', verificarToken, (req, res) => {
  res.json({ valido: true, usuario: req.usuario });
});

let produtos = [
  { id: 1, nome: 'Produto 1', preco: 10.0, disponivel: true },
  { id: 2, nome: 'Produto 2', preco: 20.0, disponivel: false },
];
let nextId = 3;

// Listar todos os produtos (protegida)
app.get('/produtos', verificarToken, (req, res) => {
  res.json(produtos);
});

// Detalhar um produto (protegida)
app.get('/produtos/:id', verificarToken, (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Inserir um novo produto (protegida)
app.post('/produtos', verificarToken, (req, res) => {
  const { nome, preco, disponivel } = req.body;
  const novoProduto = { id: nextId++, nome, preco, disponivel };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Atualizar um produto (protegida)
app.put('/produtos/:id', verificarToken, (req, res) => {
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

// Remover um produto (protegida)
app.delete('/produtos/:id', verificarToken, (req, res) => {
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
