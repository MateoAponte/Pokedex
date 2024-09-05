import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }
  @Get('get-movements/:id')
  async findMoves(@Param('id') id: string) {
    const pokemon = await this.pokemonService.getPokemon(id);
    return this.pokemonService.getMoves(pokemon.moves);
  }
  @Get('get-movement/:name')
  async findMove(@Param('name') name: string) {
    return await this.pokemonService.getMove(name);
  }
}
