import React from 'react';

import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import Dropdown from '../elements/Dropdown.jsx';

const NameMailRole = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-3">
        <TextField
          hintText={props.hintText}
          defaultValue={props.defaultValue}
          fullWidth
        />
      </div>
      <div className="col-xs-3">
        <TextField
          hintText={props.hintText2}
          defaultValue={props.defaultValue2}
          fullWidth
        />
      </div>
      <div className="col-xs-2" style={{marginTop:-8}}>
        <Dropdown
          menuItems={props.menuItems}
          selectedValue={props.selectedValue}
        />
      </div>
      <div className="col-xs-1 a-margin-top">
        <a href="url">add Role</a>
      </div>
      <div className="col-xs-1 icon-margin-top">
        <FontIcon className="material-icons">edit</FontIcon>
        <FontIcon className="material-icons">delete</FontIcon>
      </div>
    </div>
  </div>
);


export default NameMailRole;
