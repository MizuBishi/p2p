import React from 'react';

import { RaisedButton } from 'material-ui';
import Header2Line from '../elements/Header/Header2Line.jsx';
import TextField from 'material-ui/TextField';
import Dropdown from '../elements/Dropdown.jsx';


const EditProjectPage = props => (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Header2Line
            title={`Project: ${props.title}`}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <TextField
            hintText="Title"
            defaultValue={props.title}
            fullWidth
            inputStyle={{ color: '#333333' }}
            onChange={e => props.handleTitleChanged(e.target.value)}
          />
        </div>
        <div className="col-xs-4">
          <TextField
            hintText="Name Coach"
            defaultValue={props.coachName}
            fullWidth
            inputStyle={{ color: '#333333' }}
            onChange={e => props.handleCoachChanged(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4" style={{ marginTop: -8 }}>
          <Dropdown
            menuItems={props.selectStates}
            selectedValue={props.selectedStateId}
          />
        </div>
      </div>
      <div className="row push-top-medium">
        <div className="col-xs-4 align-right">
          <RaisedButton
            label="Cancel"
            onClick={props.handleCancel}
          />
        </div>
        <div className="col-xs-4">
          <RaisedButton
            label="Save"
            primary
            onClick={props.handleSave}
            disabled={props.readonly}
          />
        </div>
      </div>
    </div>
  );

EditProjectPage.propTypes = {
  title: React.PropTypes.string,
  handleTitleChanged: React.PropTypes.func,
  handleCoachChanged: React.PropTypes.func,
  coachName: React.PropTypes.string,
  selectStates: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
  selectedStateId: React.PropTypes.string,
  handleCancel: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  readonly: React.PropTypes.bool,
};

export default EditProjectPage;
