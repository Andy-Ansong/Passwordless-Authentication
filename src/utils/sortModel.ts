import { Query } from 'mongoose';

const sort = <T>(modelQuery: Query<T[], T>, sortQuery?: string): Query<T[], T> => {
    let sortBy = 'name';
    if (sortQuery) {
        sortBy = sortQuery.split(',').join(' ');
    }
    return modelQuery.sort(sortBy);
}

export default sort;
