import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { ResponseDTO } from '../dtos/ResponseDTO';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email: string, password: string): Promise<ResponseDTO> {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                return new ResponseDTO(false, 'Usuario no encontrado', 404);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return new ResponseDTO(false, 'Contraseña incorrecta', 401);
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.SECRET_KEY || "",
                { expiresIn: '1h' }
            );

            return new ResponseDTO(true, 'Login exitoso', 200, { token });
        } catch (error: any) {
            return new ResponseDTO(false, 'Error en el servidor', 500, { error: error.message });
        }
    }
}