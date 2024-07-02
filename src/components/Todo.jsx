import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";
import { useAuth } from "../security/authContext";
import { useEffect } from "react";
import { useState } from "react";
import { Field, Form, Formik } from "formik";

const Todo = () => {

    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [todo, setTodo] = useState({});

    const navigate = useNavigate();
    const description = todo.description;
    const targetDate = todo.targetDate;
    useEffect(() => getTodo(), [id])
    const getTodo = () => {
        retrieveTodoApi(username, id)
            .then((res) => setTodo(res.data))
            .catch((e) => console.log(e))
    }

    const onSubmit = (values) => {
      console.log(values);
      const todoUpdate = {
        id: id,
        username: username,
        description: values.description,
        createDate: new Date(),
        targetDate: values.targetDate,
        status: false 
      }
      console.log(todoUpdate);

      if(id == -1){
        createTodoApi(username, todoUpdate)
          .then(() => navigate('/todos'))
          .catch(e => console.log(e))

      } else {
        updateTodoApi(username, id, todoUpdate)
        .then(() => navigate("/todos"))
        .catch((e) => console.log(e))
      }
      
    }
    
  return (
    <div>
        <h1>Enter Todo details</h1>
        <div className="mt-6">
            <Formik 
              initialValues={{description, targetDate}}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                    <fieldset className="md:flex md:items-center mb-6">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description</label>
                      <div className="md:w-2/3">
                        <Field type="text" name="description" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" />
                      </div>
                    </fieldset>

                    <fieldset className="md:flex md:items-center mb-6">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Target Date</label>
                      <div className="md:w-2/3">
                        <Field type="date" name="targetDate" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" />
                      </div>
                    </fieldset>

                    <div>
                      <button type="submit" className="w-full border-sky-500">Save</button>
                    </div>
                </Form>
                
              )}
            </Formik>
        </div>
    </div>
  )
}

export default Todo