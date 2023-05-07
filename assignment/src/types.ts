import { ReactNode } from "react";

export type JokeType = {
    id: number;
    Title: string;
    Author: string;
    CreatedAt: string;
    Views: number;
  };
 export  type User = string | null;

 export interface AuthContextType {
    user: User;
    login: (user: User) => void;
    logout: () => void;
  }

  export interface Props {
    children: ReactNode;
  }

 export interface Joke {
    Title: string;
    Author: string;
    CreatedAt: string;
    Views: string;
  }
  
  export interface JokeFormProps {
    isEditing: boolean;
  }
  
