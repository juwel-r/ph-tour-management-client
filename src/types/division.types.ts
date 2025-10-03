export interface IDivision {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddDivision {
  name: string;
  description: string;
}
