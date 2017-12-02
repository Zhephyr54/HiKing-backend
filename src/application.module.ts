import { HapinessModule, OnError, OnStart } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

@HapinessModule({
    version: '1.0.0',
    imports: [],
    declarations: [],
    providers: []
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        console.log('Application started with success');
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        console.error('A problem occurred during application\'s lifecycle');
    }
}
