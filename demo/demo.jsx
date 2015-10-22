import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../src/index';

require('./demo.scss');

ReactDOM.render(
    <Calculator />,
    document.getElementById('demo')
);
