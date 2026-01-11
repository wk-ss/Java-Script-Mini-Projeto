import { Router } from 'express';
import { pool } from '../database';

const router = Router();

/* CREATE */
router.post('/', async (req, res) => {
  const { name, price, ativo = true } = req.body;

  await pool.query(
    'INSERT INTO products (name, price, ativo) VALUES (?, ?, ?)',
    [name, price, ativo]
  );

  res.json({ message: 'Produto criado' });
});


/* READ */
router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM products');
  res.json(rows);
});


/* UPDATE */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, ativo } = req.body;

  await pool.query(
    'UPDATE products SET name=?, price=?, ativo=? WHERE id=?',
    [name, price, ativo, id]
  );

  res.json({ message: 'Produto atualizado' });
});

/* DELETE */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    'UPDATE products SET ativo = false WHERE id = ?',
    [id]
  );

  res.json({ message: 'Produto apagado' });
});


export default router;
