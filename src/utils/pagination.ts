import { Query } from 'mongoose';

const pagination = (
    modelQuery: Query<any, any>, 
    page: number = 1, 
    limit: number = 20, 
    total: number
): Query<any, any> => {
    page = parseInt(page.toString(), 10) || 1;
    limit = parseInt(limit.toString(), 10) || 20;

    const startIndex = (page - 1) * limit;

    if (total !== 0 && startIndex >= total) {
        throw new Error("Start index exceeds total items.");
    }

    return modelQuery.skip(startIndex).limit(limit);
}

export default pagination;
