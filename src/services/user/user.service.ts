import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { User } from '../../interfaces';
import { UserDocumentService } from '../user-document';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap , map  , catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    /**
     * Class constructor
     */
    constructor(private _userDocumentService: UserDocumentService) {}

    /**
     * Returns all existing users in the list
     *
     * @returns {Observable<User[]>}
     */
    listAll(): Observable<User[] | void> {
        return this._userDocumentService.find();
    }

    /**
     * Returns one users of the list matching id in parameter
     *
     * @param {string} id of the users
     *
     * @returns {Observable<User>}
     */
    one(id: string): Observable<User> {
        return this._userDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`User with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if users already exists and add it in users list
     *
     * @param user to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */

    create(user: User): Observable<HapinessHTTPHandlerResponse> {
        return this._userDocumentService.create(user)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }
    /**
     * Update a users in users list
     *
     * @param {string} id of the users to update
     * @param user data to update
     *
     * @returns {Observable<User>}
     */
    update(id: string, user: User): Observable<User> {
        return this._userDocumentService.findByIdAndUpdate(id, user)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`User with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on users in users list
     *
     * @param {string} id of the users to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._userDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`user with id '${id}' not found`))
                )
            );
    }
}
