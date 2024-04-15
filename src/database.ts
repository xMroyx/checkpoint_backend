import { DataSource } from "typeorm";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./data/mydatabase.sqlite",
  entities: [Country],
  synchronize: true,
  logging: false,
});

export const initializeDataSources = async () => {
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.error("Erreur lors de la connexion à la bdd", err);
  }
};
