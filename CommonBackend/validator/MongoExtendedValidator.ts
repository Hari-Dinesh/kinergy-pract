import {ObjectId} from "mongodb";

const Validator = require("validatorjs");

let ExtendedValidator = function (dbClient: any) {

    Validator.registerAsync(
        "alpha-space",
        async (value, requirement, attribute, passes) => {
            try {
                if (/^[a-zA-Z ]*$/.test(value)) {
                    passes();
                } else {
                    passes(false, "Invalid " + attribute + " Value");
                }
            } catch (e) {
                passes(false, "Invalid " + attribute + " Value");
            }
        }
    );

    Validator.registerAsync('array', async (value, attributes, field_name, passes) => {
        value = Array.isArray(value);
        if (value) {
            passes(true);
        } else {
            passes(false, 'Given ' + field_name + ' is not a arrayy');
        }

    });

    Validator.registerAsync('exists', async (value: any, requirement: string, attribute: any, passes) => {
        try {
            let table: string = "";
            let column: string = "";
            if (requirement.indexOf(",") > -1) {
                const bits = requirement.split(",");
                if (bits.length === 1) {
                    table = bits[0];
                    column = attribute;
                } else {
                    table = bits[0];
                    column = bits[1];
                }
            }
            let filter: {
                [name: string]: any
            } = {};
            if (column.indexOf("_id") > -1) {
                filter[column] = new ObjectId(value);
            } else {
                filter[column] = value
            }

            dbClient.collection(table).countDocuments(filter).then((results: any) => {   
                if (results > 0) {
                    passes(true, "");
                } else {
                    passes(false, 'The ' + column + ' does not exist in table'); // if username is not available
                }
            })
        } catch (err: any) {
            console.log(err);
            passes(false, 'Error connecting to DB in validation');
        }
    });

    Validator.registerAsync('mongoObjectId', async (value, attributes, field_name, passes) => {
        value = ObjectId.isValid(value);
        if (value) {
            passes(true);
        } else {
            passes(false, 'Given ' + field_name + ' Is Not A Valid Mongo Id');
        }
    });

    Validator.registerAsync('unique', async (value: any, requirement: string, attribute: any, passes) => {
        try {
            let table: string = "";
            let column: string = "";
            let ignore_value: string = ""
            let errorMessage = ""

            if (requirement.indexOf(",") > -1) {
                const bits = requirement.split(",");
                if (bits.length === 1) {
                    table = bits[0];
                    column = attribute;
                } else {
                    table = bits[0];
                    column = bits[1];
                }
                ignore_value = bits[2];
                
                if(bits[3]){
                    errorMessage = bits[3].split(":")[1];
                }
                
            }
            let filter: {
                [name: string]: any
            } = {};
            if (column.indexOf("_id") > -1) {
                filter[column] = new ObjectId(value);
            } else {
                filter[column] = value
            }

            if (ignore_value) {
                filter["_id"] = {$ne: new ObjectId(ignore_value)}
            }
            
            
            dbClient.collection(table).countDocuments(filter).then((results: any) => {
                if (results > 0) {
                    if(errorMessage){
                        passes(false, errorMessage)
                    }else{
                        passes(false, 'The ' + column + ' already exists in the table');
                    }
                   
                } else {
                    passes(true, "");
                }
            })
        } catch (err: any) {
            console.log(err);
            passes(false, 'Error connecting to DB in validation');
        }
    });

    return Validator;
};

export {ExtendedValidator};
