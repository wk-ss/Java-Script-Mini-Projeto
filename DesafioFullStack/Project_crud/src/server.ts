import express from 'express';
import path from 'path';
import productRoutes from './routes/products';

const app = express();

app.use(express.json());

// serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
