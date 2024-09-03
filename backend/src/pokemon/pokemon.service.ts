import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaConnectionService } from 'src/prisma-connection/prisma-connection.service';
import { Pokemon } from '@prisma/client';
import { IPokemon } from './entities/Pokemon';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaConnectionService) {}

  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.prisma.pokemon.findMany();
  }

  async findOne(id: string): Promise<IPokemon> {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { pokemonId: parseInt(id) },
    });
    const abilityRelation = await this.prisma.pokemonAbility.findUnique({
      where: { pokemonId: pokemon.id },
    });
    
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
