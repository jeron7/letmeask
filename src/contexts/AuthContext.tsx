import { useEffect } from "react"
import { createContext, ReactNode, useState } from "react";

import toast from 'react-hot-toast';

import { firebase, auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setFirebaseUser(user);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);
    
    if (user) {
      setFirebaseUser(user);
    }
  }

  function setFirebaseUser(user : firebase.User ) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      toast.error('Alguma informação sobre a conta Google está faltando!')
      return;
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    })
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}
