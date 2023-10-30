import {body} from "express-validator";

export const registerValidation=[
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пароля').isLength({min:5}),
    body('fullName','Слишком короткое имя').isLength({min:3}),
    body('avatarUrl','неверный формат ссылки на аватар').optional().isURL(),  
];