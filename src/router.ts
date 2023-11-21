import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { body, checkSchema, param, validationResult } from 'express-validator';
import { handleInputErrors, } from './modules/middleware';
import { createUpdate, deleteUpdate, getAllUpdates, getUpdate, updateProductUpdate } from './handlers/updates';

const router = Router({ caseSensitive: true });

/**
 * Products
 */

router.get('/products', getProducts)

router.get('/product/:id', getProduct)

router.post('/product/', body('name').isString().notEmpty(), handleInputErrors, createProduct)

router.put('/product/:id', body('name').isString().notEmpty(), handleInputErrors, updateProduct)

router.delete('/product/:id', deleteProduct)



/**
 * Updates
 */

router.get('/updates', getAllUpdates);

router.get('/updates/:id', getUpdate)

router.post(
  '/updates/',
  body('title').exists().isString().notEmpty(),
  body('body').exists().isString().notEmpty(),
  body('productId').exists().isString().notEmpty(),
  handleInputErrors,
  createUpdate
);

router.put(
  '/updates/:id',
  param('id').exists().isString().isUUID(),
  body('productId').exists().isUUID(),
  body('title').exists().isString().notEmpty().optional(),
  body('body').exists().isString().notEmpty().optional(),
  body('version').exists().optional().isString().optional(),
  body('status').exists().isIn(['IN_PROGRESS', 'ARCHIVED', 'DEPRECATED', 'LIVE']).optional(),
  body('asset').exists().isURL().optional(),
  handleInputErrors,
  updateProductUpdate
)



router.delete(
  '/updates/:id',
  param('id').exists().isUUID(),
  body('productId').exists().isUUID(),
  handleInputErrors,
  deleteUpdate
)

/** 
 * UpdatePoints
 */

router.get('/updatepoint', () => { })

router.get('updatepoint/:id', () => { })

router.put('/updatepoint/:id', (req, res, next) => {
  body('name').isString();
  body('description').isString();
  body('updateId').isString().notEmpty();
  next()
}, () => { })

router.post('/updatepoint/', (req, res, next) => {
  body('name').isString().notEmpty().optional();
  body('description').isString().notEmpty().optional();
  next();
}, () => { })

router.delete('/updatepoint/:id', () => { })

router.use((err: Error, req, res, next) => {
  res.json({ ...err })
})

export default router;