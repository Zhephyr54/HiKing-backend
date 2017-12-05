import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../../services';
import { User } from '../../../interfaces/hiking';

import * as Joi from 'joi';

@Route({
    path: '/api/users/{id}',
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
                    email: Joi.string().required(),
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required(),
                    address: Joi.string().required(),
                    photo: Joi.string()
                })
            }
        },
        description: 'Get one users',
        notes: 'Returns one users for the given id in path parameter',
        tags: ['api', 'users']
    }
})
export class GetOneUserRoute implements OnGet {
    /**
     * Class constructor
     * @param _userService
     */
    constructor(private _userService: UserService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<User> {
        return this._userService.one(request.params.id);
    }
}
