import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { HikingService } from '../../../services';

import * as Joi from 'joi';

@Route({
    path: '/api/hikings/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete hikings',
        notes: 'Delete one hikings for the given id in path parameter',
        tags: ['api', 'hikings']
    }
})
export class DeleteOneHikingRoute implements OnDelete {
    /**
     * Class constructor
     * @param _hikingService
     */
    constructor(private _hikingService: HikingService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._hikingService.delete(request.params.id);
    }
}
