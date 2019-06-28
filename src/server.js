import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

window.renderFromServer = () => ReactDOMServer.renderToString(<App/>);