import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_KEY,{
        expiresIn: '7d'
    })

    res.cookie('jwt', token, {
        expiresIn: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV !== 'Development'
    })

    return token;
}