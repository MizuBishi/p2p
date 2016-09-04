import React from 'react';

import Dropdown from '../elements/Dropdown.jsx';
import LabelStars from './LabelStars.jsx';

const OverviewCriteriaPage = React.createClass({
  onDropdownChange: function(event, index, value) {
    this.setState({idx: index});
  },
  getInitialState: function() {
    return {idx: 0};
  },
  render: function() {
    var that=this;
    return (
      <div className="container">
        <div className="row" style={{marginBottom:30}}>
          <div className="col-xs-12">
            <Dropdown
              handleChange={this.onDropdownChange}
              selectedValue={this.state.idx}
              menuItems={this.props.criterias.map((criteria, idx) => {
                return {label: criteria.title, value: idx};
              })}
              />
          </div>
        </div>
        {
          this.props.criterias[this.state.idx].ratings.map(function(rating, i) {
            return (
              <LabelStars
                text={rating.name + ', ' + rating.role}
                stars={rating.stars}
                key={that.state.idx + '_' + i}
                name={'star_' + that.state.idx + '_' + i}
                />
            );
          })
        }
        <div className="row">
          <div className="col-xs-12">
          </div>
        </div>
      </div>
    );
  }
});

export default OverviewCriteriaPage;
