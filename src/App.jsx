import { useState } from 'react'
import { useEffect } from 'react'
import UserAuth from './components/userAuth'
import './App.css'
import { auth } from './firebase'
import Home from './components/home'
import { usePost } from './hooks/usePosts'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadin, setLoadin] = useState(false);

  const {posts, loading} = usePost();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    console.log(posts); // for debbuging
    return () => unsubscribe()
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home auth={auth} user={user} posts={posts}/>} />
      <Route path="/auth" element={<UserAuth auth={auth} />} />
      <Route path="/home" element={
        <RequireAuth>
          <Home auth={auth} user={user} posts={posts}/>
        </RequireAuth>
         } />
    </Routes>
    {/**
      <div className="App">
        {user ? (<Home auth={auth} user={user} posts={posts}/>) : (<UserAuth auth={auth}/>)}
      </div> */}
    </>
  )
}

export default App
