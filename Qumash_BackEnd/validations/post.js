import {body} from "express-validator";

export const registerValidationPost=[
    body('description', 'Короткое описание').isLength({min:20}),
    body('name','Слишком короткое название').isLength({min:3}),
    
];