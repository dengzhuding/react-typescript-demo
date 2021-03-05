import * as React from 'react';
import * as ReactDom from 'react-dom';

import {Hello} from './components/hello';
// import {printStr} from './utils/index'

// printStr('here is index');
import('./utils/index').then(utils => {
  console.log(utils)
})
ReactDom.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('root')
)
