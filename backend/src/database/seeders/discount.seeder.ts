import { AppDataSource } from "../data-source";
import { Discount } from "../entities/Discount";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { v4 as uuidv4 } from "uuid";

export async function seedDiscounts() {
    const discountRepository = AppDataSource.getRepository(Discount);
    const productRepository = AppDataSource.getRepository(Product);
    const userRepository = AppDataSource.getRepository(User);

    // Obtener los primeros 2 productos con sus precios
    const products = await productRepository.find({ take: 2 });
    if (products.length < 2) {
        throw new Error("❌ Se requieren al menos 2 productos para asignar descuentos.");
    }

    // Obtener usuario
    const testUser = await userRepository.findOneBy({ email: "admin@example.com" });
    if (!testUser) {
        throw new Error("❌ No se encontró el usuario con email 'admin@example.com'.");
    }

    const discounts: Partial<Discount>[] = [
        {
            id: uuidv4(),
            product_id: products[0].id,
            type: 10, // 10% de descuento
            value: products[0].unit_price * 0.10, // Calcula el valor del descuento
            start_date: new Date("2023-10-01"),
            end_date: new Date("2023-12-31"),
            is_active: true,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            product_id: products[1].id,
            type: 20, // 20% de descuento
            value: products[1].unit_price * 0.20, // Calcula el valor del descuento
            start_date: new Date("2023-10-01"),
            end_date: new Date("2023-12-31"),
            is_active: true,
            created_by_user_id: testUser.id,
            updated_by_user_id: testUser.id,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    try {
        await discountRepository.save(discounts);
        console.log("✅ Descuentos insertados correctamente.");
    } catch (error) {
        console.error("❌ Error al insertar descuentos:", error);
        throw error;
    }
}
