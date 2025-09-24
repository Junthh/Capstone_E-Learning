
import { useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './routes';
import { Toaster } from "sonner";


function App() {
  const routerElements = useRoutes(routes);
  return (
    <>
      {routerElements}
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App