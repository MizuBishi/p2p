
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabelCheckbox from './LabelCheckbox.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/LabelCheckbox', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::checked', () => (
  <div className="app flex-center-middle">
    <LabelCheckbox
      textSontiges="Kann eigene und fremde Anliegen..."
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
