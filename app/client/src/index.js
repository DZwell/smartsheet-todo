import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import TaskList from './components/TaskList.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TaskList />, document.getElementById('root'));
registerServiceWorker();
