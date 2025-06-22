import { LocalDiningOutlined } from "@mui/icons-material";
import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "src/services/auth";
const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(()=> {
        async function fetchUser() {
            let role = localStorage.getItem('role');
            if(!role) role = 'user'
            const response = await checkAuth(role);
            if(response.error) {
                setUser(null);
            } else {
                setUser(response.userData);
            }
            setLoading(false);
        }
        fetchUser();
    },[]);

    useEffect(()=> {
        console.log(user);
    },[user])

    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}