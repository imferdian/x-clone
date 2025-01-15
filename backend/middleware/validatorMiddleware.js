import {check, validationResult} from 'express-validator';

export const validatorMiddleware = [
    check('email', "Please include a valid email").isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    }
]

