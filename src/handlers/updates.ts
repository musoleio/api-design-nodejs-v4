import { prisma } from "../db";

export const getAllUpdates = async (req, res) => {
  const { userId } = req.user;
  const products = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    include: {
      updates: true
    }
  });

  const updates = products.flatMap(p => p.updates)

  res.json({ data: updates })
}

export const getUpdate = async (req, res) => {
  const { userId } = req.user;
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.id,
        userId: req.user.id
      }
    },
    include: {
      updates: true
    }
  });

  res.json({ data: product!.updates })
}

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        userId: req.user.id,
        id: req.body.productId
      }
    }
  });

  if (!product) {
    res.json({ error: 'error' });
  }

  const productUpdate = await prisma.update.create({
    data: {
      ...req.body
    }
  });

  res.json({ data: productUpdate })
}

export const updateProductUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.productId,
        userId: req.user.id
      }
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        }
      }
    }
  });

  if (!product) {
    return res.json({ message: 'Not found' })
  }

  const newUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body,
  })

  res.json({ data: newUpdate })
}

// delete an update for a product belonging to the current user
export const deleteUpdate = async (req, res) => {

  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.productId,
        userId: req.user.id
      }
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        }
      }
    }
  });

  if (product && product.updates.length > 0) {
    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id
      }
    })

    return res.json({ data: deleted })
  }

  res.status(404);
  res.json({ data: "Nah" })
}