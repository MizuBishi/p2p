// Node imports
import fetch from 'isomorphic-fetch';


export const updateTeamMember = (criteria, callback) => {
  fetch('http://localhost:3000/p2p/api/team/member/test', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(criteria),
  })
  .then(response => callback(response));
};
