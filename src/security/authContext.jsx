import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null)


  async function login(username, password) {

    try {

        const response = await executeJwtAuthenticationService(username, password)

        if(response.status==200){
            
            const jwtToken = 'Bearer ' + response.data.token
            
            setIsAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )

            return true            
        } else {
          logOut()
            return false
        }    
    } catch(error) {
      logOut()
        return false
    }
}

  const logOut = () => {
    setToken(null)
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{isAuthenticated, login, logOut, username, token}}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes  = {
  children: PropTypes.node
};
export default AuthProvider;
