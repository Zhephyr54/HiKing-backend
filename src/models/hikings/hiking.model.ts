import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';

@MongoModel({
    adapter: 'mongoose',
    collection: 'hikings',
    options: Config.get('mongodb')
})
export class HikingModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(HikingModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            title: String,
            photo: String,
            date: {
                type: String,
                required: true
            },
            guide_id: {
                    type: String,
                    required: true
            },
            startLocalization: {
                type: String,
                required: true
            },
            endLocalization: {
                type: String,
                required: true
            },
            duration: {
                type: String,
                required: true
            },
            distance: {
                type: Number,
                required: true
            },
            complexity: {
                type: String,
                required: true
            },
            description: String,
            personMinNumber: {
                type: Number,
                required: true
            },
            personMaxNumber: {
                type: Number,
                required: true
            },
            hikers_id: [String],
            price: Number
        }, {
            versionKey: false
        });

        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    return ret;
                }
            }
        );
    }
}
