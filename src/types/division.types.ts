export interface IDivision {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDivisionFormData {
  data: IAddDivision;
  file: File;
}
interface IAddDivision {
  name: string;
  description: string;
}
