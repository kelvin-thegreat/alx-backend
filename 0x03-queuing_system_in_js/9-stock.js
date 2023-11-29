import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: 'Suitcase 1450',
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: 'Suitcase 1650',
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: 'Suitcase 150',
    price: 550,
    initialAvailableQuantity: 5,
  },
];

const getItemById = (id) => {
  const item = listProducts.find((obj) => obj.itemId === id);

  if (item) {
    return { ...item };
  }
};

const app = express();
const client = createClient();
const PORT = 1245;

const reserveStockById = async (itemId, stock) => {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  return promisify(client.GET).bind(client)(`item.${itemId}`);
};

// Middleware for handling product not found
const productNotFound = (req, res, next) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(Number.parseInt(itemId));

  if (!productItem) {
    res.json({ status: 'Product not found' });
  } else {
    req.productItem = productItem;
    next();
  }
};

app.get('/list_products', (_, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId(\\d+)', productNotFound, async (req, res) => {
  try {
    const { itemId, productItem } = req;
    const reservedStock = await getCurrentReservedStockById(itemId);
    productItem.currentQuantity = productItem.initialAvailableQuantity - Number.parseInt(reservedStock || 0);
    res.json(productItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reserve_product/:itemId', productNotFound, async (req, res) => {
  try {
    const { itemId, productItem } = req;
    const reservedStock = await getCurrentReservedStockById(itemId);

    if (reservedStock >= productItem.initialAvailableQuantity) {
      res.json({ status: 'Not enough stock available', itemId });
    } else {
      await reserveStockById(itemId, reservedStock + 1);
      res.json({ status: 'Reservation confirmed', itemId });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const resetProductsStock = () => {
  return Promise.all(
    listProducts.map((item) => promisify(client.SET).bind(client)(`item.${item.itemId}`, 0))
  );
};

app.listen(PORT, () => {
  resetProductsStock()
    .then(() => {
      console.log(`API available on localhost port ${PORT}`);
    });
});

export default app;

