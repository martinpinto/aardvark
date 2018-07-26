import { logger } from '../../services/logger.service';
const { Config } = require('../../../config/index');
let config = Config();

var mysql = require('mysql');

export class MySqlRepository {
    connection;

    constructor() {
        this.connection = mysql.createConnection({
            host     : config.database.mysql.baseurl,
            user     : config.database.mysql.user,
            password : config.database.mysql.password,
            database : config.database.mysql.database
        });
    }
    
    query(sql, args): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows: any[]) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    convertDateToYMD(date) {
        var year, month, day;
        year = String(date.getFullYear());
        month = String(date.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(date.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
}

// export default class MySqlRepository implements IModelRepository {
//     private config;
    
//     constructor() {
//         this.config = Config();
//     }

//     private async createConnection() {
//         console.log(this.config);
//         return mysql.createConnection({
//             host     : this.config.database.mysql.baseurl,
//             user     : this.config.database.mysql.user,
//             password : this.config.database.mysql.password,
//             database : this.config.database.mysql.database
//         }).catch((e) => {
//             logger.debug(e);
//         });
//     }
    
//     async query(query: string) {
//         let connection = await this.createConnection();
//         logger.debug("query:", query)            
//         let rows = await connection.query(query);
//         await connection.end();
//         return rows;
//     }

//     /**
//      * Return the number of records that match the optional "where" filter.
//      *
//      * @param: modelName string
//      *   The database table/record to be queried.
//      * @param: [where] IWhereFilter
//      *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...}
//      */
//     count(modelName: string, where?: IWhereFilter) {
//         return this.createConnection().then(connection => {
//             return connection.query(`SELECT COUNT * FROM ${modelName}`).then(rows => {
//                 connection.end();
//                 return rows[0];
//             });
//         });
//     };

//     /**
//      * Create new instance of Model, and save to database.
//      * 
//      * @param: model Object		
//      *   data Optional data argument. Can be either a single model instance or an array of instances.
//      * @param: modelName string
//      *   the name of the table/record to be deleted.
//      */
//     create(model: Model, modelName: string): Promise<string> {
//         return this.createConnection().then(connection => {
//             delete model._type;

//             let mappedProperties: IModelAttributes = this.getAllAttributes(model);
//             let properties: string[] = [];
//             let values: string[] = [];
//             for (let i = 0; i < mappedProperties.properties.length - 1; i++) {
//                 properties[i] = `${mappedProperties.properties[i]}, `;
//             }
//             // add last property
//             properties[mappedProperties.properties.length - 1] = mappedProperties.properties[mappedProperties.properties.length - 1];
            
//             for (let i = 0; i < mappedProperties.values.length - 1; i++) {
//                 let value = mappedProperties.values[i];
//                 // if (!value || typeof value === 'object') {
//                 //     properties.splice(i); // remove element from properties
//                 // } else {
//                     if (typeof value !== 'number') {
//                         value = `'${value}'`;
//                     }
//                     values[i] = `${value}, `;
//                 // }
//             }
//             // add last value
//             let lastValue = mappedProperties.values[mappedProperties.values.length - 1];
//             if (typeof lastValue !== 'number') {
//                 lastValue = `'${lastValue}'`;
//             }
//             values[mappedProperties.values.length - 1] = lastValue;
            
//             let query: string = `INSERT INTO ${modelName} (${properties.join("")}) VALUES (${values.join("")})`;
//             logger.debug("query:", query);
//             return connection.query(query).then(result => {
//                 connection.end();   
//                 return result;         
//             });
//         })
        
//     };

//     /**
//      * Destroy all model instances that match the optional where specification.
//      * 
//      * @param: modelName string
//      *   the name of the table/record to be deleted.
//      * @param: [where] IWhereFilter	
//      *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
//      */
//     destroyAll(modelName: string, where?: IWhereFilter) {
//         let database = null;
       
//     };

//     /**
//      * Destroy model instance with the specified ID.
//      * 
//      * @param: id
//      *   The ID value of model instance to delete.
//      * @param: modelName string
//      *   the name of the table/record to be deleted.
//      * @param: [where] IWhereFilter	
//      *   Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
//      */
//     destroyById(id, modelName: string, where?: IWhereFilter) {
//         let database = null;
        
//     };

//     /**
//      * Check whether a model instance exists in database.
//      * 
//      * @param: id	
//      *   Identifier of object (primary key value).
//      * @param: modelName string
//      *   the name of the table/record to be deleted.
//      */
//     exists(id, modelName: string) {

//     };

//     /**
//      * Find all model instances that match filter specification.
//      *
//      * @param: modelName string
//      *   the name of the table/record to be fetched.
//      * @param: [where] IWhereFilter | string
//      *     Model instances matching the filter, or null if none found.
//      * @param: [join] string
//      *   joins the table/record with another table/record.
//      * @param: [sort] string
//      *   sorts the table/table according to a specific criteria.
//      */
//     find(modelName: string | string[], fields?: string, where?: IWhereFilter | string, join?: string, sort?: string) {
//         return this.createConnection().then(connection => {
//             let whereFilter = where ? ` WHERE ${where}` : "";
//             let joinFilter = join ? join : "";
//             let sortFilter = sort ? sort : "";
//             let fieldsFilter = fields ? fields : "*";
//             let modelFilter = modelName instanceof Array ? modelName.join(", ") : modelName;
//             let query: string = `SELECT ${fieldsFilter} FROM ${modelName} ${whereFilter}${joinFilter}${sortFilter}`;
//             logger.debug("query:", query)
//             return connection.query(query).then(rows => {
//                 connection.end();
//                 return rows;
//             });
//         });
//     };

//     /**
//      * Find object by ID with an optional filter for include/fields.
//      * 
//      * @param: modelName string
//      *   the name of the table/record to be fetched.
//      * @param: id		
//      *   Primary key value
//      * @param: [where] IWhereFilter	
//      *   Optional Filter JSON object
//      */
//     findById(modelName: string, id, where?: IWhereFilter) {
//         return this.createConnection().then(connection => {
//             let whereFilter = where ? ` AND ${where}` : "";
//             return connection.query(`SELECT * FROM ${modelName} AS ${modelName} WHERE id = ${id}${whereFilter}`).then(row => {
//                 connection.end();
//                 return row;
//             });
//         });
//     };

//     /**
//      * Update single model instance that match the where clause.
//      * 
//      * @param: id 
//      *   Primary key value
//      * @param: [where] IWhereFilter
//      *   Optional where filter, like {}
//      */
//     updateById(id, where?: IWhereFilter) {

//     };

//     /**
//      * Update multiple instances that match the where clause.
//      * 
//      * @param: models Object	
//      *   Object containing data to replace matching instances, if any.
//      * @param: [where] IWhereFilter 
//      *   Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
//      *   see Where filter.
//      */
//     updateAll(models, where?: IWhereFilter) {

//     };

//     getAllAttributes(model: Model): IModelAttributes {
//         let attributes: IModelAttributes = {
//             properties: [],
//             values: []
//         };
//         for (let property in model) {
//             if (model.hasOwnProperty(property)
//                 && typeof model[property] !== 'function'
//                 && property !== '_id'
//                 && property !== '_name'
//             ) {
//                 attributes.properties.push(property);
//                 attributes.values.push(model[property]);
//             }
//         }
//         return attributes;
//     }
// }
