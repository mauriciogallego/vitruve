import { Athlete } from '@prisma/client';

export class AthleteEntity implements Athlete {
  team: string;
  id: string;
  name: string;
  active: boolean;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}
