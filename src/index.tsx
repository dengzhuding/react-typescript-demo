import * as React from 'react';
import * as ReactDom from 'react-dom';

import {Hello} from './common/components/hello';
// import {printStr} from './utils/index'
import Home from '@pages/home/index'

// printStr('here is index');
import('./common/utils/index').then(utils => {
  console.log(utils)
})
ReactDom.render(
  // <Hello compiler="TypeScript" framework="React" />,
  <Home/>,
  document.getElementById('root')
)
