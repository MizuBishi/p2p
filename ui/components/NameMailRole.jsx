import React from 'react';

import Inputfield from '../elements/Inputfield.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import FontIcon from 'material-ui/FontIcon';

const NameMailRole = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-3"><Inputfield
              hintText={props.hintText}
              defaultValue={props.defaultValue}/>
            </div>
            <div className="col-xs-3"><Inputfield
              hintText={props.hintText2}
              defaultValue={props.defaultValue2}/>
            </div>
            <div className="col-xs-2 dropdown-margin-top dropdown-first-disabled">
              <Dropdown
              selectedValue=""
                menuItems={[
                  {
                    label: 'Role',
                    value: 'R',
                  },
                  {
                    label: 'Quality Manager',
                    value: 'QM',
                  },
                  {
                    label: 'TEC Leader',
                    value: 'TEC',
                  },
                  {
                    label: 'Requirements Engineer',
                    value: 'REQ',
                  },
                  {
                    label: 'Usability Manager',
                    value: 'UM',
                  },
                  {
                    label: 'Information Manager',
                    value: 'IM',
                  },
                  {
                    label: 'Test Manager',
                    value: 'Test',
                  },
                ]}
                onChange={() => console.log('Changed to')}
              />
            </div>
            <div className="col-xs-1 a-margin-top"><a href="url">add Role</a>
            </div>
            <div className="col-xs-1 icon-margin-top">
              <FontIcon className="material-icons">edit</FontIcon>
              <FontIcon className="material-icons">delete</FontIcon>
            </div>
          </div>
        </div>
      );
};

export default NameMailRole;
