import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import RouterConfig from './routes';

import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
<Router>
    <RouterConfig />
</Router>
, document.getElementById('root'));
registerServiceWorker();
