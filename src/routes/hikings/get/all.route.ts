import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { Hiking } from '../../../interfaces';
import { HikingService } from '../../../services';

import * as Joi from 'joi';

@Route({
    path: '/api/hikings',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
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
                ).unique().min(1)
            }
        },
        description: 'Get all hikings',
        notes: 'Returns an array of hikings or 204',
        tags: ['api', 'hikings']
    }
})
export class GetAllHikingRoute implements OnGet {
    /**
     * Class constructor
     * @param _hikingService
     */
    constructor(private _hikingService: HikingService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Hiking[] | void> {
        return this._hikingService.listAll();
    }
}
