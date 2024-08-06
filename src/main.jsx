import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Customer from './Pages/Home/Customer.jsx'
import HomeAdministration from './Pages/Home/HomeAdministration.jsx'
import FormAdministrator from './Pages/Form/FormAdministration/FormAdministrator.jsx'
import FormLogin from './Pages/Form/FormLogin/FormLogin.jsx'
import Uploadproduct from './Pages/Form/Uploadproduct/Uploadproduct.jsx'
import Blouses from './Pages/Products/Blouses.jsx'
import Coat from './Pages/Products/Coat.jsx'
import Dresses from './Pages/Products/Dresses.jsx'
import Shirts from './Pages/Products/Shirts.jsx'
import Ties from './Pages/Products/Ties.jsx'
import Wallets from './Pages/Products/Wallets.jsx'
import FormTie from './Pages/Form/FormTie/FormTie.jsx'
import Vieweorder from './Pages/vieworder/ViewWorder.jsx'
import FormRegistro from './Pages/Form/FormRecord/FormRegistro.jsx'
import { AuthProvider } from './Server/AuthContext.jsx'
import ViewWorder from './Pages/vieworder/ViewWorder.jsx'
import ErrorBoundary from './Server/ErrorBoundary.jsx'
import AccountPage from './Pages/AccountPage/AccountPage.jsx'
import ShoppingCart from './Pages/shoppingCart/shoppingCart.jsx'
import SingleOrder from './Pages/SingleOrder/SingleOrder.jsx'
import Myshopping from './Pages/Myshopping/MyShopping.jsx'
import InfoPage from './Pages/InfoPage/InfoPage.jsx'
import UpDareProduct from './Pages/Form/UpdateProduct/UpdateProduct.jsx'
import AddAdmins from './Pages/Form/AddAdmins/AddAdmins.jsx'
import EditUser from './Pages/Form/EditUser/EditUser.jsx'
import DeleteProduct from './Pages/Form/DeletedProduct/DeletedProduct.jsx'
import DeleteUser from './Pages/Form/DeletedUser/DeletedUser.jsx'

const router =  createBrowserRouter([
  {
    Path : '/',
    element : <App></App>
  },
  {
    path :'/',
     element : <Customer></Customer>
  },
  {
     path : '/HomeAdministration',
     element : <HomeAdministration></HomeAdministration>
  },
  {
     path: '/FormAdministrator',
     element : <FormAdministrator></FormAdministrator>
  },
  {
     path: '/FormLogin',
     element : <FormLogin></FormLogin>
  },
  {
     path : '/FormRegistro',
     element :<FormRegistro></FormRegistro>
  },
  {
     path : '/Uploadproduct',
     element : <Uploadproduct></Uploadproduct>
  },
  {
    path : '/ViewWorder',
    element :<Vieweorder></Vieweorder>
  },
  {
    path : '/FormTie',
    element : <FormTie></FormTie>
  },
  {
     path : '/Blouses',
     element : <Blouses></Blouses>
  },
  {
     path : '/Coat',
     element : <Coat></Coat>
  },
  {
     path : '/Dresses',
     element : <Dresses></Dresses>
  },
  {
     path : '/Shirts',
     element : <Shirts></Shirts>
  },
  {
  path : '/Ties',
     element : <Ties></Ties>
  },
  {
     path : '/Wallets',
     element : <Wallets></Wallets>

  },
  {
   path :'/ViewWorder/:productId',
   element :<ViewWorder></ViewWorder>
  },
  {
   path :'/ViewCount',
   element :<AccountPage></AccountPage>
  },
  {
   path :'/shoppingcart',
   element :<ShoppingCart></ShoppingCart>
  },
  {
   path :'/singleorder',
   element : <SingleOrder></SingleOrder>
  },
  {
   path: '/MyShoppings',
   element: <Myshopping></Myshopping>
  },
  {
   path: '/InfoPage',
   element: <InfoPage></InfoPage>
  },
  {
   path: '/UpdateProduct',
   element: <UpDareProduct></UpDareProduct>
  },
  {
   path: '/AddAdmins',
   element: <AddAdmins></AddAdmins>
  },
  {
   path: '/EditUser',
   element: <EditUser></EditUser>
  },
  {
   path: '/deleteproduct',
   element: <DeleteProduct></DeleteProduct>
  },
  {
   path: '/DeleteAdmins',
   element: <DeleteUser></DeleteUser>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
      <ErrorBoundary>
    <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>,
)
