import React from 'react';
import * as ReactDom from 'react-dom';
import * as _ from 'lodash';

console.log(_.join([1, 23, 4], 'test'));
ReactDom.render(<h1>another-module</h1>, document.getElementById('root'))
