
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const { config } = require('./../config/config');

const service = new UserService;

class AuthService {
    async getUser(email, password) {
        const user = await service.findEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return {
            user,
            token
        };
    }

    async sendMail(email) {
        const user = await service.findEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: config.emailSender,
                pass: config.emailPassword
            }
        });

        await transporter.sendMail({
            from: 'elio@mail.com', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Este es un nuevo corrreo ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Saludo desde api</b>", // html body
        });

        return { message: 'mail sent' }
    }
}

module.exports = AuthService;