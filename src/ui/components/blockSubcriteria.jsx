import React from 'react';

import Header2Line from '../elements/Header/Header2Line.jsx';
import CriteriaStars from './criteriaStars.jsx';

const BlockSubcriteria = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
        myTitle={props.title}
        />
      </div>
    </div>
    {(() => (props.criterias ? props.criterias.map((criteria) =>
      <div className="row">
        <div className="col-xs-12">
          <CriteriaStars
            textCriteria={criteria.label}
            valueEffective={criteria.stars}
            />
        </div>
      </div>
    ) : undefined))()}
  </div>
);

BlockSubcriteria.propTypes = {
  title: React.PropTypes.string,
  criterias: React.PropTypes.array,
}

export default BlockSubcriteria;
