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

export interface fbResponse {
  _provider: string;
  _profile: Profile;
  _token: Token;
}
interface Profile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  profilePicURL: string;
}
interface Token {
  accessToken: string;
  expiresAt: number;
}
