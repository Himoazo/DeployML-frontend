export type LogIn = {
    email: string;
    password: string;
};
  
export type Token = {
  access_token: string;
  token_type: string;
}

export type SignUp = {
  email: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

export type UserInfo = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  api_key: string;
}