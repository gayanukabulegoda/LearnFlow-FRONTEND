import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import App from './App';
import './index.css';
/**
 * @fileOverview Main component to render the application.
 * @returns The {@link JSX.Element} for the main component.
 */
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);