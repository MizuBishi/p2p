import React from 'react';

import Inputfield from '../elements/Inputfield.jsx';
import FontIcon from 'material-ui/FontIcon';

const AddCriteria = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6">
          <Inputfield style={{fontWeight:"1em"}}
            hintText={props.hintText}
          />
        </div>
        <div className="col-xs-6">
          <FontIcon className="material-icons">delete</FontIcon>
        </div>
      </div>
    </div>
  );
};

AddCriteria.propTypes = {
  hintText: React.PropTypes.string,
};

export default AddCriteria;
