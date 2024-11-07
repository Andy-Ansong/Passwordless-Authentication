import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '@model/User'; // Adjust the import if User model is in TypeScript and has IUser interface
import { JwtKey, RefreshKey } from '@types/environment'; // Custom type for JWT environment keys if defined

interface AuthRequest extends Request {
    user?: IUser;
    accessToken?: string;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized. Please log in to continue."
            });
        }

        let user: IUser | null;

        try {
            const data = jwt.verify(accessToken, process.env.JWT_KEY as JwtKey) as JwtPayload;
            user = await User.findById(data._id).exec();
            if (!user) {
                return res.status(401).json({
                    status: "error",
                    message: "Unauthorized. Please log in to continue."
                });
            }
            req.user = user;
            return next();
        } catch (err: any) {
            if (err.name === "TokenExpiredError") {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    });
                }
                try {
                    const refreshData = jwt.verify(refreshToken, process.env.REFRESH_KEY as RefreshKey) as JwtPayload;
                    user = await User.findById(refreshData._id).exec();
                    if (!user) {
                        return res.status(401).json({
                            status: "error",
                            message: "Unauthorized. Please log in to continue."
                        });
                    }
                    const newAccessToken = await user.generateAccessToken();
                    const newRefreshToken = await user.generateRefreshToken();
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        // sameSite: 'Lax',
                        maxAge: 24 * 60 * 60 * 1000 // 1 day
                    });
                    req.user = user;
                    req.accessToken = newAccessToken;
                    next();
                } catch (err) {
                    return res.status(401).json({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    });
                }
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Unauthorized. Please log in to continue."
                });
            }
        }
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized. Please log in to continue."
        });
    }
};

export default auth;
