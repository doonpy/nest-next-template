declare global {
  export type User = {
    id: number;
    name: string;
    age: number;
    createAt: Date;
    updatedAt: Date;
  };

  export type UserCreateInput = {
    name: string;
    age: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };
}

export {};
