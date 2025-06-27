import { AppDataSource } from "../data-source";
import { UnitOfMeasure } from "../entities/UnitOfMeasure";

export async function seedUnitOfMeasures() {
    const unitOfMeasureRepository = AppDataSource.getRepository(UnitOfMeasure);

    const units = [
        { name: "unidad" },
        { name: "kilogramo" },
        { name: "litro" },
        { name: "metro" },
    ];

    try {
        await unitOfMeasureRepository.save(units);
        console.log("✅ Unidades de medida insertadas correctamente.");
    } catch (error) {
        console.error("❌ Error al insertar unidades de medida:", error);
        throw error;
    }
} 