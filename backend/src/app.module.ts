import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaConnectionModule } from './prisma-connection/prisma-connection.module';

@Module({
  imports: [PokemonModule, PrismaConnectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
