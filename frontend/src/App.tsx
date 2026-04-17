import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './styles/App.css';
import router from './routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
