import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

export async function seedUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const saltRounds = 10; // Número de rondas de sal para el hashing

    const users: User[] = [
        {
            id: uuidv4(),
            first_name: "Super",
            email: "admin@example.com",
            password: await bcrypt.hash("admin", saltRounds),
            last_name: "Admin",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario1@example.com",
            password: await bcrypt.hash("password1", saltRounds),
            last_name: "Uno",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario2@example.com",
            password: await bcrypt.hash("password2", saltRounds),
            last_name: "Dos",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario3@example.com",
            password: await bcrypt.hash("password3", saltRounds),
            last_name: "Tres",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario4@example.com",
            password: await bcrypt.hash("password4", saltRounds),
            last_name: "Cuatro",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario5@example.com",
            password: await bcrypt.hash("password5", saltRounds),
            last_name: "Cinco",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario6@example.com",
            password: await bcrypt.hash("password6", saltRounds),
            last_name: "Seis",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario7@example.com",
            password: await bcrypt.hash("password7", saltRounds),
            last_name: "Siete",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario8@example.com",
            password: await bcrypt.hash("password8", saltRounds),
            last_name: "Ocho",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario9@example.com",
            password: await bcrypt.hash("password9", saltRounds),
            last_name: "Nueve",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            first_name: "Usuario",
            email: "usuario10@example.com",
            password: await bcrypt.hash("password10", saltRounds),
            last_name: "Diez",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    try {
        await userRepository.save(users);
        console.log("✅ Usuarios insertados correctamente.");
    } catch (error) {
        console.error("❌ Error al insertar usuarios:", error);
        throw error;
    }
}
