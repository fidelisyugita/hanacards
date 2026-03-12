import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User as FirebaseUser, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { apiFetch } from "../lib/api";
import { useCartStore, CartItem } from "../store/cartStore";

export interface DbUser {
  uid: string;
  email: string;
  displayName?: string | null;
  role: "ADMIN" | "CUSTOMER";
  address?: null | {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  dbUser: DbUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshDbUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const setFromDB = useCartStore((state) => state.setFromDB);

  const fetchDbUser = async () => {
    try {
      const dbProfile = await apiFetch<DbUser>("/me");
      setDbUser(dbProfile);

      try {
        const dbCart = await apiFetch<any[]>("/me/cart");
        // Convert API shape to Zustand shape
        const formattedCart: CartItem[] = dbCart.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
        }));
        setFromDB(formattedCart);
      } catch (e) {
        console.error("Failed to load DB cart", e);
      }
    } catch (err) {
      console.error("Failed to fetch DB profile", err);
      // Usually signifies the user just registered on Firebase but the
      // API hasn't upserted them yet. The register flow will handle this.
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      setCurrentUser(user);
      if (user) {
        // Logged in: fetch roles & profile from our DB
        await fetchDbUser();
      } else {
        // Logged out
        setDbUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        dbUser,
        loading,
        logout,
        refreshDbUser: fetchDbUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
