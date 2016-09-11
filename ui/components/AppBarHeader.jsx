import React from 'react';

import AppBar from 'material-ui/appBar';

const AppBarHeader = (props) => {
  return (
    <AppBar
      title={props.title}
        titleStyle={{
        fontSize: '2.5rem',
        fontWeight: 'lighter'
      }}
    />
  );
};

export default AppBarHeader;
