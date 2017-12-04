import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, filter, map } from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';

import { HikingModel } from '../../models';

import { Hiking } from '../../interfaces';
import { Config } from '@hapiness/config';

@Injectable()
export class HikingDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, HikingModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Hiking[] or undefined
     *
     * @return {Observable<Hiking[] | void>}
     */
    find(): Observable<Hiking[] | void> {
        return fromPromise(this._document.find({}))
            .pipe(
                flatMap((docs: MongooseDocument[]) =>
                    of(of(docs))
                        .pipe(
                            flatMap(_ =>
                                mergeStatic(
                                    _.pipe(
                                        filter(__ => !!__ && __.length > 0),
                                        map(__ => __.map(doc => doc.toJSON())),
                                    ),
                                    _.pipe(
                                        filter(__ => !__ || __.length === 0),
                                        map(__ => undefined)
                                    )
                                )
                            )
                        )
                )
            );
    }

    /**
     * Returns one hikings of the list matching id in parameter
     *
     * @param {string} id of the hikings in the db
     *
     * @return {Observable<Hiking | void>}
     */
    findById(id: string): Observable<Hiking | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Hiking) :
                        of(undefined)
                )
            )
    }

    /**
     * Check if hikings already exists and add it in hikings list
     *
     * @param {Hiking} hiking to create
     *
     * @return {Observable<Hiking>}
     *
     */


    create(hiking: Hiking): Observable<Hiking> {
        return fromPromise(this._document.findOne({
            guide_id: { $regex: new RegExp(hiking.guide_id, 'i') },
            date: { $regex: new RegExp(hiking.date, 'i') },
            startLocalization: { $regex: new RegExp(hiking.startLocalization, 'i') }
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`hiking already exists`)
                    ) :
                    fromPromise(this._document.create(hiking))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Hiking)
            );
    }

    /**
     * Update a hikings in hikings list
     *
     * @param {string} id
     * @param {Hiking} hiking
     *
     * @return {Observable<Hiking>}
     */
    findByIdAndUpdate(id: string, hiking: Hiking): Observable<Hiking> {
        return fromPromise(this._document.findByIdAndUpdate(id, hiking, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Hiking) :
                        of(undefined)
                )
            )
    }

    /**
     * Delete a hikings in hikings list
     *
     * @param {string} id
     *
     * @return {Observable<Hiking>}
     */
    findByIdAndRemove(id: string): Observable<Hiking> {
        return fromPromise(this._document.findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Hiking) :
                        of(undefined)
                )
            )
    }
}
