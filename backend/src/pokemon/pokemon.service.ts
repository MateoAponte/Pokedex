import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaConnectionService } from 'src/prisma-connection/prisma-connection.service';
import { PokemonList } from '@prisma/client';
import { BDPokemon, IPokemon } from './entities/Pokemon';
import { Ability } from './entities/Ability';
import { Movement } from './entities/Moves';
import { Type } from './entities/Type';
import { PaginationDto } from './dto/pagination.dto';
import { PAGINATION } from 'src/constants/constants';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaConnectionService) {}

  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  async findAll(paginationDto: PaginationDto): Promise<PokemonList[]> {
    return await this.prisma.pokemonList.findMany({
      skip: parseInt(paginationDto.skip ?? PAGINATION.skip),
      take: parseInt(paginationDto.limit ?? PAGINATION.limit),
    });
  }

  async getPokemon(id: string): Promise<BDPokemon> {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { pokemonId: parseInt(id) },
    });
    return pokemon;
  }

  async getAbilities(id: string): Promise<Ability[]> {
    const abilityRelation = await this.prisma.ability_Pokemon.findMany({
      where: { pokemonId: id },
    });

    const abilities = await Promise.all(
      abilityRelation.map(async (item) => {
        const ability = await this.prisma.ability.findUnique({
          where: { id: item.abilityId },
        });
        return {
          abilityId: ability.abilityId,
          name: ability.name,
          text: this.prisma.parsedTextBD(ability.text),
          isHidden: item.isHidden,
        };
      }),
    );

    return abilities;
  }

  async getTypes(types: string[]): Promise<Type[]> {
    const pokemonTypes = await this.prisma.types.findMany({
      where: {
        name: {
          in: types,
        },
      },
      select: {
        name: true,
        sprite: true,
        typeId: true,
      },
    });
    return pokemonTypes;
  }

  async getMoves(names: string[]): Promise<Movement[]> {
    const movements = await this.prisma.movements.findMany({
      where: {
        name: {
          in: names,
        },
      },
      select: {
        text: true,
        name: true,
        type: true,
        power: true,
        pp: true,
        movementId: true,
      },
    });

    const parsedMovements = movements.map((movement) => ({
      ...movement,
      text: this.prisma.parsedTextBD(movement.text), // Aquí aplicas la función a 'text'
    }));

    return parsedMovements;
  }
  async getMove(name: string): Promise<Movement> {
    const movement = await this.prisma.movements.findUnique({
      where: {
        name: name,
      },
      select: {
        text: true,
        name: true,
        type: true,
        power: true,
        pp: true,
        movementId: true,
      },
    });
    console.log(movement);

    movement.text = this.prisma.parsedTextBD(movement.text);
    return movement;
  }

  async findOne(id: string) {
    const pokemon = await this.getPokemon(id);
    const abilities = await this.getAbilities(pokemon.id);
    const types = await this.getTypes(pokemon.types);
    return {
      ...pokemon,
      abilities,
      types,
      stats: JSON.parse(pokemon.stats),
    };
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
