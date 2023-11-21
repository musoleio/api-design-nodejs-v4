import { prisma } from "../db";

export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      include: {
        products: true
      }
    })
    res.json({ data: user!.products })
  } catch (error) {
    next(error);
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id
        }
      }
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id
      }
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id
        }
      },
      data: {
        name: req.body.name
      }
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id_userId: {
          id: req.params.id,
          userId: req.user.id
        }
      },
    });
    res.json({ data: product, status: 'success' });
  } catch (error) {
    next(error);
  }
}