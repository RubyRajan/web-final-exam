import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Appbar from './Appbar';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import Signin from './components/SIgnin';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Navbar } from 'react-bootstrap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductList />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
]);

function App() {
  return (
    <div>
      <Appbar />
      <div className="container">
        <RouterProvider router={router} />
      </div>
      <div className="text-center py-4">
        <p>Made by Ruby Thavalathil Rajan 8919678</p>
      </div>
    </div>
  );
}

export default App;
