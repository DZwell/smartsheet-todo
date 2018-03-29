import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskList from './TaskList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TaskList />, document.getElementById('root'));
registerServiceWorker();
