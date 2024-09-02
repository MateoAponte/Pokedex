import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class GreetPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value: ', value);
    const ageNumber = parseInt(value.age.toString(), 10);

    if (isNaN(ageNumber)) {
      throw new HttpException('Invalid Age Number', HttpStatus.BAD_REQUEST);
    }
    if (value.name.length <= 3) {
      throw new HttpException(
        'The name must be greater than 3 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
