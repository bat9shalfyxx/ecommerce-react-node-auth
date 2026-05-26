import { RouterProvider } from 'react-router';
import { createAppRouter } from './router/router';

function App() {
    const router = createAppRouter(true, false);

    return <RouterProvider router={router} />;
}

export default App;
