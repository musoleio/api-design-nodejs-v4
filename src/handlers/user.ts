import { prisma } from '../db';
import { hashPassword, createJWT, comparePassword } from '../modules/auth';

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      }
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.error(error)
    next(error);
  }
}

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  if (user && await comparePassword(password, user.password)) {
    return res.json({ token: createJWT(user), user });
  }

  res.status(401);
  res.json('Incorrect password or username');
}