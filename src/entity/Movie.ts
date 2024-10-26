import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number; // Use o operador de asserção não nula

  @Column()
  year!: number;

  @Column()
  title!: string;

  @Column()
  studios!: string;

  @Column()
  producers!: string;

  @Column()
  winner!: boolean;
}
