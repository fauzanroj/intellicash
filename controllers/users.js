import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async (req,res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
    }
}

export const Register = async (req, res) => {
    const {name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "password dan confpassword tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "register berhasil"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {
            return res
            .status(400)
            .json({
                status: 'fail',
                message: 'wrong password'
            })
        }
        const userId = user.Id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process,env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });
        await Users.update({refresh_token: refreshToken},{
            where: {
                id:userId
            }
        });
        res.json({ accessToken });
    } catch (error) {
        res
        .status(404)
        .json({
            status: 'fail',
            message: 'email not found'
        })
    }
}
export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findOne({
        where:{
            refresh_token: refreshToken
        }
    });

    if (!Users) return res.sendStatus(204);

    const userId = user.id;
    await Users.update({refresh_token: null},{
        where: {
            id : userId
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}