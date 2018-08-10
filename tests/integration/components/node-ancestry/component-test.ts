import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | node-ancestry', hooks => {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(hbs`{{node-ancestry}}`);

        assert.dom(this.element).hasText('');

        // Template block usage:
        await render(hbs`
            {{#node-ancestry}}
                template block text
            {{/node-ancestry}}
        `);

        assert.dom(this.element).hasText('template block text');
    });
});
