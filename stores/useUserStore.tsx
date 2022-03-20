import create from "zustand"
import { persist } from "zustand/middleware"

interface User { 

}

interface UserState {
  user: User| null ;
    setUser: (e: User) => void;
    
    token: string;
    setToken: (e: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    setUser: (e: User) => set(() => ({ user: e })),
    token: "",
    setToken: (e: string) => set(() => ({ token: e })),
}))