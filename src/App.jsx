import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './Components/Home'
import DetailedCard from './Components/DetailedCard'


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/moviesDB-React/' element={<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path='*' element={<Home />}/>
        </Route>
        <Route path='*' element={<Home />}/>
        <Route path='/DetailedCard/:id' element={<DetailedCard />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App