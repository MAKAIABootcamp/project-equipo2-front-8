import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/store';
import '../src/index.css'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRouter /> 
    </Provider>
);
