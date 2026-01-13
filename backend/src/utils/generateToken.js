import jwt from jsonwebtoken;

//Generate shot live access
export const generateAccessToken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_ACCESS_SECRET,{expiredIn:"15m"});
}
//Generate ling live access
export const generateRefreshToken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_REFRESH_ACCESS_SECRET,{expiredIn:"7d"});
}