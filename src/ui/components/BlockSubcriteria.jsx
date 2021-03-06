import React from 'react';

import LabeledStarRating from '../elements/LabeledStarRating.jsx';

import Header2Line from '../elements/Header/Header2Line.jsx';


const BlockSubcriteria = props => (
  <div className="container" >
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title={props.title}
        />
      </div>
    </div>
    {(() => (props.criterias ? props.criterias.map(criteria => (
      <div className="row" key={criteria.criteriaId}>
        <div className="col-xs-12">
          <LabeledStarRating
            value={criteria.rating || 0.01}
            onRatingChanged={props.onRatingChanged}
            readonly={props.readonly}
            id={criteria.criteriaId}
            {...criteria}
          />
        </div>
      </div>)
    ) : undefined))()}
  </div>
);

BlockSubcriteria.propTypes = {
  title: React.PropTypes.string,
  readonly: React.PropTypes.bool,
  criterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      criteriaId: React.PropTypes.string,
      rating: React.PropTypes.number,
      onRatingChanged: React.PropTypes.func,
    })
  )
  ,
};

export default BlockSubcriteria;
