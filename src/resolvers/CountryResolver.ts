import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entity/Country";
import { AppDataSource } from "../database";

@Resolver((of) => Country)
export class CountryResolver {
  // Obtenir tous les pays
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    const countryRepository = AppDataSource.getRepository(Country);
    return await countryRepository.find();
  }

  // Obtenir un pays par son code
  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    const countryRepository = AppDataSource.getRepository(Country);
    return await countryRepository.findOneBy({ code });
  }

  // Ajouter un nouveau pays
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<Country> {
    const countryRepository = AppDataSource.getRepository(Country);
    const newCountry = countryRepository.create({
      code,
      name,
      emoji,
    });
    await countryRepository.save(newCountry);
    return newCountry;
  }
  // Ajout d'un pays avec le code continent
  @Mutation(() => Country)
  async addCountrybyCodeContinent(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode", { nullable: true }) continentCode: string
  ): Promise<Country> {
    const countryRepository = AppDataSource.getRepository(Country);
    const newCountry = countryRepository.create({
      code,
      name,
      emoji,
      continentCode,
    });
    await countryRepository.save(newCountry);
    return newCountry;
  }
  // Récupération de tous les pays d'un continent
  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return AppDataSource.getRepository(Country).findBy({ continentCode });
  }
}
