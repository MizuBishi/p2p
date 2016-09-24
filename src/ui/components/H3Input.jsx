// React Imports
import React from 'react';

// Material Imports
import TextField from 'material-ui/TextField';

// Local imports
import Header3 from '../elements/Header/Header3.jsx';


const H3Input = props => (
  <div className="container" key={props.id}>
    <div className="row">
      <div className="col-xs-12 h3-padding">
        <Header3
          myTitle={props.title}
        />
      </div>
      <div className="col-xs-12 h3-line-width">
        <TextField
          defaultValue={props.defaultValue}
          fullWidth
          hintText={props.hintText}
          name={props.name}
          onChange={e => props.onValueChanged(e.target.value)}
        />
      </div>
    </div>
  </div>
);

H3Input.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  hintText: React.PropTypes.string,
  onValueChanged: React.PropTypes.func,
  title: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
};

export default H3Input;
