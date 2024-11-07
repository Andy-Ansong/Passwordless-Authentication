import { Model, Document } from 'mongoose';

const search = <T extends Document>(Model: Model<T>, query: Record<string, any>) => {
    return Model.find(query);
}

export default search;
