
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Error from './components/Error'
import ListTodo from './components/ListTodo'
import Header from './components/Header'
import AuthProvider, { useAuth } from './security/authContext'
import Todo from './components/Todo'

function App() {
  // eslint-disable-next-line react/prop-types
  const AuthenticatedRoute = ({children}) => {
    const authContext = useAuth();
    if(authContext.isAuthenticated) return children;

    return <Navigate to="/"/>

  }
  
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Login />}/>

            <Route 
              path='/welcome/:username' 
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route 
              path='/todos/:id' 
              element={
                <AuthenticatedRoute>
                  <Todo />
                </AuthenticatedRoute>
              }
            />
            <Route 
              path='/todos' 
              element={
                <AuthenticatedRoute>
                  <ListTodo/>
                </AuthenticatedRoute>
              }
            />

            <Route path='*' element={<Error />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
