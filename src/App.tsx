import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
/**
 * @author: Gayanuka Bulegoda
 * @github: https://github.com/gayanukabulegoda
 * @website: https://grbulegoda.me
 * -------------------------------------------------------------------
 * @project: LearnFlow FRONTEND
 * @since: 03-02-2025 11:00 AM
 * @version: 1.0.0
 * -------------------------------------------------------------------
 * @file: App.tsx - The main entry point of the application.
 * -------------------------------------------------------------------
 */
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: 'goals',
                element: <PrivateRoute><Goals/></PrivateRoute>
            },
            {
                path: 'resources',
                element: <PrivateRoute><Resources/></PrivateRoute>
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;