import jwt from 'jsonwebtoken'

export const generateTokenAndCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});

    res.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000, // Mengatur expired cookie
        httpOnly: true, // Melindungi cookie dari serangan XSS (Cross-Site Scripting).
        sameSite: 'strict', // Ini mencegah serangan CSRF (Cross-Site Request Forgery).
        secure: process.env.NODE_ENV !== 'development', //Saat lagi di development mode, cookie nggak butuh HTTPS, jadi aman buat dipakai.

    })
}

