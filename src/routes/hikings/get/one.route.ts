import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { HikingService } from '../../../services';
import { Hiking } from '../../../interfaces/hiking';

import * as Joi from 'joi';

@Route({
    path: '/api/hikings/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {
            status: {
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    photo: Joi.string(),
                    title: Joi.string().allow(''),
                    date: Joi.string().required(),
                    guide_id: Joi.string().required(),
                    startLocalization: Joi.string().required(),
                    endLocalization: Joi.string().required(),
                    duration: Joi.string().required(),
                    distance: Joi.number().positive().required(),
                    complexity: Joi.string().required(),
                    description: Joi.string().allow(''),
                    personMinNumber: Joi.number().positive().required(),
                    personMaxNumber: Joi.number().positive().required(),
                    hikers_id: Joi.array().items(Joi.string()),
                    price: Joi.number().positive()
                })
            }
        },
        description: 'Get one hikings',
        notes: 'Returns one hikings for the given id in path parameter',
        tags: ['api', 'hikings']
    }
})
export class GetOneHikingRoute implements OnGet {
    /**
     * Class constructor
     * @param _hikingService
     */
    constructor(private _hikingService: HikingService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Hiking> {
        return this._hikingService.one(request.params.id);
    }
}
