export type Article = {
  id: number;
  name: string;
  title: string;
  author: string;
  content: string[];
  image: string;
};

export type User = {
  id: string;
  passwordHash: string;
  name: string;
};

export type UserForm = User & {
  password: string;
};
