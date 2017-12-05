import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { HikingService } from '../../../services';
import { Hiking } from '../../../interfaces';

import * as Joi from 'joi';

@Route({
    path: '/api/hikings/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                id: Joi.string().required(),
                photo: Joi.string(),
                title: Joi.string().allow(''),
                date: Joi.string().required(),
                guide_id: Joi.string().required(),
                startLocalization: Joi.string().required(),
                endLocalization: Joi.string().required(),
                duration: Joi.string().required(),
                distance: Joi.number().required(),
                complexity: Joi.string().required(),
                description: Joi.string().allow(''),
                personMinNumber: Joi.number().required(),
                personMaxNumber: Joi.number().required(),
                hikers_id: Joi.array().items(Joi.string()),
                price: Joi.number()
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
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
                    distance: Joi.number().required(),
                    complexity: Joi.string().required(),
                    description: Joi.string().allow(''),
                    personMinNumber: Joi.number().required(),
                    personMaxNumber: Joi.number().required(),
                    hikers_id: Joi.array().items(Joi.string()),
                    price: Joi.number()
                })
            }
        },
        description: 'Update one hikings',
        notes: 'Update the hikings for the given id in path parameter and return it',
        tags: ['api', 'hikings']
    }
})
export class PutUpdateHikingRoute implements OnPut {
    /**
     * Class constructor
     * @param _hikingService
     */
    constructor(private _hikingService: HikingService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Hiking> {
        return this._hikingService.update(request.params.id, request.payload);
    }
}
