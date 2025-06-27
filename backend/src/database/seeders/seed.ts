import { AppDataSource } from "../data-source";
import { seedProducts } from "./products.seeder";
import { seedUnitOfMeasures } from "./unit-of-measure.seeder";
//import { seedUsers } from "./user.seeder";

AppDataSource.initialize().then(async () => {
  console.log("🌱 Ejecutando seeders...");
  // await seedUsers();
  await seedUnitOfMeasures();
//  await seedProducts();
  console.log("🌱 Seeding completo ✅");
  process.exit(0);
}).catch((err) => {
  console.error("❌ Error al hacer seed:", err);
  process.exit(1);
});
