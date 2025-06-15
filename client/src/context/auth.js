import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ''
  });
axios.defaults.headers.common['Authorization'] = auth?.token || ''; // Set default header for axios
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setAuth({
        user: parsed.user,
        token: parsed.token
      });
    }
  }, []); // Run only once on mount

  return (
    <AuthContext.Provider value={{
       auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
