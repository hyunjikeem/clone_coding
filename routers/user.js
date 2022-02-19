const express = require('express');
const User = require('../schemas/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
const bcrypt = require('bcrypt');

const router = express.Router();

//이메일, 닉네임 유효성 검사

// const checkUsersSchema = Joi.object({
//     userEmail: Joi.string().required(),
//     userNickname: Joi.string().required(),
// });

//이메일, 닉네임 중복확인

// router.post('/join/check', async (req, res) => {
//     try {
//         const { userEmail, userNickname } = await checkUsersSchema.validateAsync(req.body);

//         const existEmail = await User.find({ userEmail });
//         const existNickname = await User.find({ userNickname });
//         console.log(existEmail);
//         console.log(existNickname);

//         if (existEmail.length) {
//             res.status(200).send({
//                 ok: false,
//                 errorMessage: '이미 사용중인 이메일입니다.😖',
//             });
//             return;
//         }

//         if (existNickname.length) {
//             res.status(200).send({
//                 ok: false,
//                 errorMessage:'이미 사용중인 닉네임입니다.😖',
//             });
//             return;
//         }

//         if (!existNickname.length && !existEmail.length) {
//             res.status(200).send({
//                 ok: true,
//                 message: '사용하실 수 있는 이메일과 닉네임입니다.😊',
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).send({
//             ok: false,
//             errorMessage: '요청한 데이터 형식이 올바르지 않습니다.😨',
//         });
//     };
// });

//회원가입 유효성 검사

const UsersSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    userNickname: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
    passwordConfirm: Joi.string().required(),
});

//회원가입

router.post('/join', async (req, res) => {
    try {
        const { userEmail, userNickname, password, passwordConfirm } = await UsersSchema.validateAsync(req.body);
        
        const existEmail = await User.find({ userEmail });
        const existNickname = await User.find({ userNickname});

        if (existEmail.length) {
            res.status(200).send({
                ok: false,
                errorMessage: '이미 사용중인 이메일입니다.😖',
            });
            return;
        }

        if (existNickname.length) {
            res.status(200).send({
                ok: false,
                errorMessage: '이미 사용중인 닉네임입니다.😖',
            });
            return;
        }

        if (password !== passwordConfirm) {
            res.status(200).send({
                ok: false,
                errorMessage: '비밀번호가 일치하지 않습니다😖',
            })
            return;
        }

        const encodedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            userEmail: userEmail,
            password: encodedPassword,
            userNickname: userNickname,
        });
        await user.save();

        res.status(201).send({
            ok: true,
            message: '회원가입이 성공적으로 완료되었습니다😊',
        });
    } catch (err) {
        console.log(err);
        res.status(200).send({
            errorMessage: '빠진 항목이 있나 확인 해주세요😊',
        });
    };
});


// 로그인 유효성 검사

const LoginSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});


// 로그인

router.post('/login', async (req, res) => {
    try {
        const { userEmail, password } = await LoginSchema.validateAsync(req.body);

        const user = await User.findOne({ userEmail }).exec();

        if(!user) {
            res.status(200).send({
                ok: false,
                errorMessage: '아이디 또는 패스워드를 다시 확인해주세요😨',
            });
            return;
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(200).send({
                ok: false,
                errorMessage: '아이디 또는 패스워드가 잘못됐습니다😨',
            });
            return;
        }

        const token = jwt.sign({ userEmail: user.userId }, 'my-secret-key');
        res.send({
            token,
            userEmail,
            ok: true,
        });
    } catch (err) {
        console.log(err);
        res.status(200).send({
            ok: false,
            errorMessage: '요청한 데이터 형식이 올바르지 않습니다😨',
        });
    }
});

router.get('/users/me', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user,
    });
});

module.exports = router;