
export interface ITour {
  _id:string;
  title: string;//
  slug: string;
  description: string;//
  images: string[];
  location: string;//
  departureLocation: string;//
  arrivalLocation: string;//
  costFrom: number;//
  startDate: string;//
  endDate: string;//
  included: string[];//
  excluded: string[];//
  amenities: string[];//
  tourPlane: string[];//
  maxGuest: number;//
  minAge: number;//
  division: string;//
  tourType: string;//
  deleteImages?: string[];
}

