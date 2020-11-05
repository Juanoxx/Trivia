const Joi = require('joi');

const schema = Joi.object({
    
    name: Joi.string()
        .required(),
    
    type: Joi.string()
        .required(),
    
    questions: Joi.array().items(Joi.object({
        question: Joi.string()
            .required(),
        
        number: Joi.number()
    }))
})

const editSchema = Joi.object({
    
    name: Joi.string()
        .required(),
    
    type: Joi.string()
        .required(),
    
    questions: Joi.array().items(Joi.object({
        question: Joi.string()
            .required(),
        
        number: Joi.number()
    }))
})

verifyBody = async (req, res, next) => {
    try {
        const validation = await schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
     }
};

verifyEditBody = async (req, res, next) => {
    try {
        const validation = await editSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
     }
};

const authMiddleware = {
    verifyBody,
    verifyEditBody
};

module.exports = authMiddleware;