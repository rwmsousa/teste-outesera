import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column()
  winner: boolean;

  constructor(
    year: number,
    title: string,
    studios: string,
    producers: string,
    winner: boolean,
  ) {
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }
}
