// src/types/User.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: {
    city: string;
  };
}
