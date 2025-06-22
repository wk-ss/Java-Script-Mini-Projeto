const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [];
let proximoId = 1;

/*Caminho GET /saudacao */
app.get('/saudacao', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à API de exemplo' });
});

/*Caminho POST /usuarios */
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

/*Caminho GET /usuarios */
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

/*Caminho PUT /usuarios/:id */
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.json(usuario);
});

/*Caminho DELETE /usuarios/:id */
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios.splice(index, 1);
  res.status(204).send();
});

// Iniciar o servidor "node index.js"
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
// lembrar de ve o pq nao to conseguindo usar o put e melhorar o tratamento de erro
// otimizar e organizar o codigo 