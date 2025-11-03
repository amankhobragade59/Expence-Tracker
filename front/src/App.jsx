import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import AddTransaction from './components/AddTransaction.jsx'
import Transactions from './components/Transactions.jsx'
import EditTransaction from './components/EditTransaction.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'

function App() {
  const {authUser,getAuthUser,isLoading} = useAuthStore();

  useEffect(()=>{
    getAuthUser();
    console.log("home->",authUser);
  },[]);

  if (isLoading) return <div className="text-white p-6">Loading...</div>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
          path="/signin"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
          <Route path='/'element={authUser ? <Transactions />:<Navigate to="/signin"/> } />
          <Route path='/add-transaction' element={authUser? <AddTransaction /> :<Navigate to="/signin"/>} />
          <Route path='/edit/:id' element={authUser? <EditTransaction /> :<Navigate to="/signin"/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
