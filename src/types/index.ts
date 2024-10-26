export interface Movie {
  id?: number; // Torne a propriedade opcional
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

export interface CsvMovie {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
  years: number[];
}
