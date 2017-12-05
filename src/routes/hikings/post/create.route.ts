import {  OnPost, Route , Request } from '@hapiness/core';

import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import { HikingService } from '../../../services';
import { Hiking } from '../../../interfaces';

import * as Joi from 'joi';


@Route({
    path: '/api/hikings',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                photo: Joi.string(),
                title: Joi.string(),
                date: Joi.string().required(),
                guide_id: Joi.string().required(),
                startLocalization: Joi.string().required(),
                endLocalization: Joi.string().required(),
                duration: Joi.string().required(),
                distance: Joi.number().required(),
                complexity: Joi.string().required(),
                description: Joi.string(),
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
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    photo: Joi.string(),
                    title: Joi.string(),
                    date: Joi.string().required(),
                    guide_id: Joi.string().required(),
                    startLocalization: Joi.string().required(),
                    endLocalization: Joi.string().required(),
                    duration: Joi.string().required(),
                    distance: Joi.number().required(),
                    complexity: Joi.string().required(),
                    description: Joi.string(),
                    personMinNumber: Joi.number().required(),
                    personMaxNumber: Joi.number().required(),
                    hikers_id: Joi.array().items(Joi.string()),
                    price: Joi.number()
                })
            }
        },
        description: 'Create one hikings',
        notes: 'Create a new hikings and return it',
        tags: ['api', 'hikings']
    }
})
export class PostCreateHikingRoute implements OnPost {
    /**
     * Class constructor
     * @param _hikingService
     */
    constructor(private _hikingService: HikingService) {
    }

    /**
     * OnPost implementation
     * @param request
     */


    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._hikingService.create(request.payload as Hiking);
    }

}
