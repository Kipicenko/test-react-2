import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store"
import {storage} from "./storage";

// Делается для того, чтобы атрибут проставился сразу, а то через useEffect в App появляется некрасивый момент в начале
// Например: (тема "темная", но после перезагрузки на секундку показывается светлая тема)
// Если знаете как это можно исправить иным способом, то расскажите, буду благодарен:)
let currentTheme: string = storage.getItem("theme") || "light"
document.documentElement.dataset.theme = currentTheme;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

