import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Signup from './components/user/Signup'
import UserLogin from './components/user/UserLogin'
import UserLayout from './pages/user/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import UserAddBlog from './pages/user/UserAddBlog'
import UserListBlog from './pages/user/UserListBlog'
import UserComments from './pages/user/UserComments'


const App = () => {
  const {token}= useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user" element={<UserLayout />} />

        <Route path="/user" element={token ? <UserLayout /> : <UserLogin />}>
          <Route index element={<UserDashboard />} />
          <Route path="addBlog" element={<UserAddBlog />} />
          <Route path="blogs" element={<UserListBlog />} />
          <Route path="comments" element={<UserComments />} />
        </Route>

        {/* <Route path="/user" element={true ? <UserLayout /> : <UserLogin/>} /> */}

        <Route path="/blog/:id" element={<Blog />} />

        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
