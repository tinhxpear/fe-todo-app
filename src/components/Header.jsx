import { Menu } from "antd"
import { useAuth } from "../security/authContext"
import { useNavigate } from "react-router-dom";


const Header = () => {

    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;
    const itemsLeft = [
        {
            label: 'Welcome',
            key: 'welcome'
        },
        {
            label: 'Todos',
            key: 'todos'
        },
        
    ]
    const itemsRight = [
        {
            label: 'Logout',
            key: 'logout'
        },
    ]
    const navigate = useNavigate();
    const logOut = (e) => {
        if(e.key === 'logout') {
            let result = confirm('Are you sure logout')
            if(result) {
                authContext.logOut();
                navigate('/')
            }
        }
    }
    const handleNavigation = (e) => {
        if(e.key === 'welcome') {
            navigate('/welcome/tinhxpear')
        }
        if(e.key === 'todos') {
            navigate('/todos')
        }
    }
  return (
    <div className="flex justify-between w-full">
        {isAuthenticated 
            && <Menu 
                className="fixed top-0 left-5 w-2/4" 
                mode="horizontal" 
                items={itemsLeft} 
                onClick={handleNavigation}
        />}
        {isAuthenticated && 
            <Menu 
                className="fixed top-0 right-5 w-2/4 justify-end" 
                mode="horizontal" 
                items={itemsRight} 
                onClick={logOut}
            />}
    </div>
  )
}

export default Header