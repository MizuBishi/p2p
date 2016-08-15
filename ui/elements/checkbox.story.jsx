/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CheckboxMichelle from './checkbox.jsx';


storiesOf('elements/Checkbox', module)
.add('::unchecked', () => (
  <div className="app flex-center-middle">
    <CheckboxMichelle
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
