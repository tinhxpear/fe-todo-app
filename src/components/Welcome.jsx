import { Button } from "antd";
import { Link, useParams } from "react-router-dom"
const Welcome = () => {

    const params = useParams();
    
  return (
    <div>
        <h1>Welcome {params.username}</h1>

        <div>
            <Button size="large" type="primary" className="mt-5">
                <Link to="/todos">Go to your todo</Link>
            </Button>
        </div>
    </div>
    
  )
}

export default Welcome