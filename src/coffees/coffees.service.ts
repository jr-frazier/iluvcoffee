import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity.js';

@Injectable()
export class CoffeesService {
  private readonly coffees: Coffee[] = [
    {
      id: 1,
      name: 'Morning Blend',
      brand: 'Dunkin',
      flavors: ['Mocha', 'Vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id === Number(id));

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      this.remove(id);
      this.coffees.push({ ...existingCoffee, ...updateCoffeeDto.hey });
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(
      (coffee) => coffee.id === Number(id),
    );
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
