const { models } = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserFromDB = async (email) => {
    const user = await models.user.findOne({
        where: {
            name: email,
        },
    });
    return user;
};

const registerUser = async (req, res) => {
    const emailGiven = !!req.body?.email;
    const passwordGiven = !!req.body?.password;

    if (!(emailGiven && passwordGiven)) {
        res.status(500).send({ message: "Missing username or password" });
        return;
    }

    if (!!(await getUserFromDB(req.body.email))) {
        res.status(500).send({ message: "User already registered" });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
        name: req.body.email,
        password: hashedPassword,
    };

    models.user
        .create(user)
        .then((result) => {
            res.status(200).send({
                message: "User registered successfully",
                email: result.dataValues.name,
            });
        })
        .catch((error) => {
            res.status(500).send({ message: "Error registering user" });
        });
};

const loginUser = async (req, res) => {
    const emailGiven = !!req.body?.email;
    const passwordGiven = !!req.body?.password;

    if (!(emailGiven && passwordGiven)) {
        res.status(500).send({ message: "Missing username or password" });
        return;
    }

    const userData = await getUserFromDB(req.body.email);

    if (!userData) {
        res.status(500).send({ message: "User not found" });
        return;
    }

    if (!(await bcrypt.compare(req.body.password, userData.password))) {
        res.status(500).send({ message: "Incorrect password" });
        return;
    }

    const user = { name: userData.name };

    const accessToken = createAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_KEY);

    models.refreshToken
        .create({ id: refreshToken })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });

    res.status(200).send({ accessToken, refreshToken });
};

const changePassword = async (req, res) => {
    const { user } = req;
    if (!user.name) {
        res.status(401);
        return;
    }

    const oldPasswordGiven = !!req.body?.oldPassword;
    const newPasswordGive = !!req.body?.newPassword;

    if (!(oldPasswordGiven && newPasswordGive)) {
        res.status(500).send({ message: "Missing old or new password" });
        return;
    }

    const userData = await getUserFromDB(user.name);

    if (!(await bcrypt.compare(req.body.oldPassword, userData.password))) {
        res.status(500).send({ message: "Incorrect password" });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    models.user
        .update(
            { password: hashedPassword },
            { where: { id: userData.dataValues.id } }
        )
        .then((result) => {
            res.status(200).send({ message: "Password updated" });
            return;
        })
        .catch((err) => {
            console.log(err);
        });
};

const logoutUser = async (req, res) => {
    const token = req.body.token;
    models.refreshToken
        .destroy({ where: { i2d: token } })
        .then((result) => {
            res.status(204).send({ message: "Logged out successfully" });
        })
        .catch((error) => {
            console.log(error);
        });
};

const createAccessToken = (user) => {
    return jwt.sign({ name: user.name }, process.env.JWT_KEY, {
        expiresIn: "15m",
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
};
