import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import EmberArray, { A } from '@ember/array';
import Controller from '@ember/controller';
import { Registry as Services } from '@ember/service';
import { task } from 'ember-concurrency';
import Store from 'ember-data/store';
import Analytics from 'ember-osf-web/services/analytics';
import config from 'registries/config/environment';
import { SearchOptions, SearchOrder, SearchResults } from 'registries/services/search';
import ShareSearch, { ShareRegistration } from 'registries/services/share-search';
import RSVP from 'rsvp';

export default class Index extends Controller.extend({
    getRecentRegistrations: task(function *(this: Index) {
        const [recentResults, totalResults]: Array<SearchResults<ShareRegistration>> = yield RSVP.all([
            this.shareSearch.registrations(new SearchOptions({
                order: new SearchOrder({ display: '', ascending: false, key: 'date_updated' }),
                query: config.indexPageRegistrationsQuery,
                size: 5,
            })),
            this.shareSearch.registrations(new SearchOptions({
                size: 0,
            })),
            this.store.findAll('registration-schema'),
        ]);
        this.set('recentRegistrations', recentResults.results);
        this.set('searchableRegistrations', totalResults.total);
    }).on('init'),
}) {
    @service store!: Store;
    @service router!: Services['router'];
    @service analytics!: Analytics;
    @service shareSearch!: ShareSearch;

    recentRegistrations: EmberArray<ShareRegistration> = A([]);
    searchableRegistrations = 0;

    @action
    onSearch(query: string) {
        this.router.transitionTo('registries.discover', {
            queryParams: { q: query },
        });
    }
}
