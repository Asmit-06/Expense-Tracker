import jwt from "jsonwebtoken"

export const generateAccessToken = (userId)=>{
  return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1m'})
}

export const generateRefreshToken = (userId) => {
  return jwt.sign({userId},process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export const generateResetToken = (userId)=>{
  return jwt.sign({userId},process.env.JWT_RESET_SECRET, { expiresIn: '15m' });
}