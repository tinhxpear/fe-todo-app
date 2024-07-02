import { KeyOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/authContext";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showFailMessage ,setShowFailMessage] = useState(false);

    const authContext = useAuth();
    const navigate = useNavigate();
    const handleUsernameChang = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChang = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`);
            navigate(`/welcome/${username}`);
        } else {
            setShowFailMessage(true);
        }
    }
  return (
    <div>
        <h1>Login</h1>
        {showFailMessage && <h4 className="text-rose-600 mt-4">Login Fail</h4>}
        <div>
            <Input 
                size="large" 
                placeholder="Username" 
                prefix={<UserOutlined />} 
                className="mt-3"
                value={username}
                onChange={handleUsernameChang}
            />
            <Input 
                type="password"
                size="large" 
                placeholder="Password" 
                prefix={<KeyOutlined />} 
                className="mt-3"
                value={password}
                onChange={handlePasswordChang}
            />
            <Button size="large" className="mt-3 w-full" onClick={handleSubmit}>Login</Button>
        </div>
    </div>
  )
}

export default Login