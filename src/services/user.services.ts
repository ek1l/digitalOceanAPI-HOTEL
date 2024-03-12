import { injectable } from 'tsyringe';
import { prisma } from '../database';
import bcrypt, { hash } from 'bcrypt';
import { AppError } from '../errors/appError.erros';
import { IUser, ICreateUser, TLogin, TLoginResult, IValidateToken } from '../interface/user.interface';
import jwt from 'jsonwebtoken';
import { Response } from 'express';


@injectable()
export class UserServices {
  async create(data: ICreateUser): Promise<IUser> {
    const findUser = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });
    if (findUser) {
      throw new AppError(404, 'Already registered user.');
    }
    const findUserByEmail = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    })
    if (findUserByEmail) {
      throw new AppError(404, 'Email registered user.');
    }
    data.password = await hash(data.password, 7);
    const create = prisma.user.create({
      data: {
        ...data,
      },
    });
    return create;
  }

  async login(data: TLogin): Promise<TLoginResult> {
    const findUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!findUser) {
      throw new AppError(
        401,
        'Access denied due to lack of valid authentication credentials for the target resource. Please make sure to include the proper authentication.',
      );
    }
    const match = await bcrypt.compare(data.password, findUser.password);
    if (!match) {
      throw new AppError(
        401,
        'Access denied due to lack of valid authentication credentials for the target resource. Please make sure to include the proper authentication.',
      );
    }
    const token = jwt.sign({ id: findUser.id, role: findUser.role }, process.env.SECRET_KEY_TOKEN!, {
      expiresIn: '1h',
    });
    const user = {
      user: findUser.username,
      token: token,
      role: findUser.role,
    };
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await prisma.user.findFirst({ where: { id: id } });    
    if (!user) {
      throw new AppError(404, 'User not found.');
    }
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async get(): Promise<IUser[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async update(id: number, data: ICreateUser): Promise<IUser> {
    const findUser = await prisma.user.findFirst({ where: { id: id } });
    if (!findUser) throw new AppError(404, 'User not found');
    data.password = await hash(data.password, 7)
    const updated = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return updated;
  }


  async validateToken(res: Response): Promise<IValidateToken> {
    const response: IValidateToken = {
      valid: true,
      role: res.locals.decode.role
    };
    return response;
  }

  async validateTokenAndRespond(res: Response): Promise<void> {
    try {
      const verify = await this.validateToken(res);
      res.status(200).json(verify);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}