import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { Hiking } from '../../interfaces';
import { HikingDocumentService } from '../hiking-document';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap , map  , catchError } from 'rxjs/operators';

@Injectable()
export class HikingService {
    /**
     * Class constructor
     */
    constructor(private _hikingDocumentService: HikingDocumentService) {}

    /**
     * Returns all existing hikings in the list
     *
     * @returns {Observable<Hiking[]>}
     */
    listAll(): Observable<Hiking[] | void> {
        return this._hikingDocumentService.find();
    }

    /**
     * Returns one hikings of the list matching id in parameter
     *
     * @param {string} id of the hikings
     *
     * @returns {Observable<Hiking>}
     */
    one(id: string): Observable<Hiking> {
        return this._hikingDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Hiking with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if hikings already exists and add it in hikings list
     *
     * @param hiking to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */

    create(hiking: Hiking): Observable<HapinessHTTPHandlerResponse> {
        return this._hikingDocumentService.create(hiking)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }
    /**
     * Update a hikings in hikings list
     *
     * @param {string} id of the hikings to update
     * @param hiking data to update
     *
     * @returns {Observable<Hiking>}
     */
    update(id: string, hiking: Hiking): Observable<Hiking> {
        return this._hikingDocumentService.findByIdAndUpdate(id, hiking)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Hiking with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on hikings in hikings list
     *
     * @param {string} id of the hikings to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._hikingDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`hiking with id '${id}' not found`))
                )
            );
    }
}
