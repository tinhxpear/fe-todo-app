import { Button, Table} from "antd";
import { useEffect, useState } from "react";
import {deleteTodoApi, retrieveAllTodosForUsernameApi} from "../api/TodoApiService";
import { useAuth } from "../security/authContext";
import { useNavigate } from "react-router-dom";
const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');

    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();
    useEffect(() => refreshTodos(), [todos.length])
    const refreshTodos = () => {
        retrieveAllTodosForUsernameApi(username)
            .then((res) => setTodos(res.data))
            .catch((e) => console.log(e))
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Create Date',
          dataIndex: 'createDate',
          key: 'createDate',
        },
        {
            title: 'Target Date	',
            dataIndex: 'targetDate',
            key: 'targetDate',
          },
          {
            title: 'Status',
            key: 'status',
            render: (text, record) => {
                if(!record.status) return <span>Unfinished</span>
                return 'Finished'
            },
          },
        {
          title: 'Edit',
          key: 'edit',
          render: (text, record) => (
            <Button 
                onClick={() => handleUpdate(record.id)} 
                className="bg-orange-500 text-white" size="large"
                >
                Edit
            </Button>
          ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
              <Button onClick={() => handleDelete(record.id)} 
                className="bg-rose-500 text-white" size="large">Delete</Button>
            ),
        },
      ];
    const handleDelete = (id) => {
        const result = confirm('Are you sure delete it')
        if(result) {
            deleteTodoApi(username, id)
            .then(() => {
                setMessage('Delete item with id ' + id + ' sucessfully')
                refreshTodos()
            })
            .catch((e) => console.log(e))
        }
        
    }
    const handleUpdate = (id) => {
        console.log('update ' + id);
        navigate(`/todos/${id}`)
    }
    const handleAddTodo = () => {
      navigate('/todos/-1')
    }
  return (
    <div>
        <h1>Think you want to do</h1>
        {message && 
        <h4 className="text-white text-center mt-5 mb-5 bg-green-600 p-3 rounded-md">{message}</h4>
    }
        <Table dataSource={todos} columns={columns} />
        <Button type="primary" size="large" className="w-full" onClick={handleAddTodo}>Create</Button>
    </div>
  )
}

export default ListTodo