/* eslint-env mocha */

import { assert } from 'chai';

import { getActiveRole, getActiveRoleType, getActiveRoleTitle } from '../src/middleware/utils/activeRole.js';

const rolesWithActive = [{
  type: 'SA',
  title: 'Software Architekt',
  active: true,
}, {
  type: 'QM',
  title: 'Quality Manager',
}, {
  type: 'RE',
  title: 'Requirements Engineer',
}];

const rolesNoActive = [{
  type: 'SA',
  title: 'Software Architekt',
}, {
  type: 'QM',
  title: 'Quality Manager',
}, {
  type: 'RE',
  title: 'Requirements Engineer',
}];

describe('middleware/utils/activeRole', () => {
  describe('getActiveRole', () => {
    it('with active role', () => {
      const activeRole = getActiveRole(rolesWithActive);
      assert.isDefined(activeRole);
      assert.equal(activeRole.type, rolesWithActive[0].type);
      assert.equal(activeRole.title, rolesWithActive[0].title);
    });
    it('no active role / empty', () => {
      let activeRole = getActiveRole(rolesNoActive);
      assert.isUndefined(activeRole);

      activeRole = getActiveRole([]);
      assert.isUndefined(activeRole);
    });
  });

  describe('getActiveRoleType', () => {
    it('with active role', () => {
      assert.equal(getActiveRoleType(rolesWithActive), rolesWithActive[0].type);
    });
    it('no active role / empty', () => {
      assert.equal(getActiveRoleType(rolesNoActive), '-');
      assert.equal(getActiveRoleType([]), '-');
    });
  });

  describe('getActiveRoleTitle', () => {
    it('with active role', () => {
      assert.equal(getActiveRoleTitle(rolesWithActive), rolesWithActive[0].title);
    });
    it('no active role / empty', () => {
      assert.equal(getActiveRoleTitle(rolesNoActive), 'Unknown');
      assert.equal(getActiveRoleTitle([]), 'Unknown');
    });
  });
});
