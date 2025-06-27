import { Constants } from "../../util/Constants";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { v4 as uuidv4 } from "uuid";

export async function seedProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    const userRepository = AppDataSource.getRepository(User);

    // Buscar el usuario con email "admin@example.com" por testing
    const testUser = await userRepository.findOneBy({ email: "admin@example.com" });
    if (!testUser) {
        throw new Error("❌ No se encontró el usuario con email 'admin@example.com'.");
    }

    const products: Partial<Product>[] = [
        {
            id: uuidv4(),
            code: "PROD001",
            name: "Producto 1",
            description: "Descripción del Producto 1",
            unit_price: 10.99,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.KG,
            created_by_user_id: testUser.id, // Asignar solo el ID
            updated_by_user_id: testUser.id, // Asignar solo el ID
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD002",
            name: "Producto 2",
            description: "Descripción del Producto 2",
            unit_price: 15.50,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.KG,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD003",
            name: "Producto 3",
            description: "Descripción del Producto 3",
            unit_price: 20.00,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.LITER,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD004",
            name: "Producto 4",
            description: "Descripción del Producto 4",
            unit_price: 8.75,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.LITER,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD005",
            name: "Producto 5",
            description: "Descripción del Producto 5",
            unit_price: 12.30,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.METER,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD006",
            name: "Producto 6",
            description: "Descripción del Producto 6",
            unit_price: 5.99,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.METER,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD007",
            name: "Producto 7",
            description: "Descripción del Producto 7",
            unit_price: 18.45,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.UNIT,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD008",
            name: "Producto 8",
            description: "Descripción del Producto 8",
            unit_price: 22.10,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.UNIT,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD009",
            name: "Producto 9",
            description: "Descripción del Producto 9",
            unit_price: 7.25,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.UNIT,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: uuidv4(),
            code: "PROD010",
            name: "Producto 10",
            description: "Descripción del Producto 10",
            unit_price: 14.80,
            unit_of_measure_id: Constants.UNIT_OF_MEASURE.UNIT,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date()
        },
    ];

    try {
        await productRepository.save(products);
        console.log("✅ Productos insertados correctamente.");
    } catch (error) {
        console.error("❌ Error al insertar productos:", error);
        throw error;
    }
}
