import { run } from '@ember/runloop';
import { setupTest } from 'ember-osf-web/tests/helpers/osf-qunit';
import { module, test } from 'qunit';

module('Unit | Model | draft-registration', hooks => {
    setupTest(hooks);

    test('it exists', function(assert) {
        const model = run(() => this.owner.lookup('service:store').createRecord('draft-registration'));
        assert.ok(!!model);
    });
});