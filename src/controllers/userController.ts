import { Request, Response } from "express";
import User from "../model/User";
import search from "../utils/searchModel";
import pagination from "../utils/pagination";
import sort from "../utils/sortModel";
import errorHandler from "../utils/errorHandler";

// Define types for query parameters
interface UserQueryParams {
  name?: string;
  sort?: string;
  page?: string;  // These are typically strings in query parameters
  limit?: string;
}

const getAllUsers = errorHandler(async (req: Request<{}, {}, {}, UserQueryParams>, res: Response) => {
  const searchQuery = req.query.name;
  let query = User.find({});

  // Search query if available
  if (searchQuery) {
    query = search(User, { name: { $regex: searchQuery, $options: 'i' } });
  }

  // Sort query if available
  query = sort(query, req.query.sort);

  // Pagination setup
  const total = await User.countDocuments();
  const page = parseInt(req.query.page || "1", 10);  // Default to page 1 if not provided
  const limit = parseInt(req.query.limit || "10", 10);  // Default to limit of 10 if not provided

  // Get paginated results
  const users = await pagination(query, page, limit, total);

  // Send response
  return res.status(200).send({ page, total, status: "success", users });
});

export default {
  getAllUsers
};
