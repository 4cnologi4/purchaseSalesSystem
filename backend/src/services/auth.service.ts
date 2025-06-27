import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { User } from '../database/entities/User';

import * as dotenv from "dotenv";

dotenv.config();

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email: string, password: string): Promise<{ token: string } | null> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY || "",
            { expiresIn: '1h' }
        );
        return { token };
    }
}