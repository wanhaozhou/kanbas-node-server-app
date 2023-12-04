import * as dao from "./dao.js";

const UserRoutes = (app) => {
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    app.get("/api/users", findAllUsers);

    const createUser = async (req, res) => {
        try {
            const user = await dao.createUser(req.body);
            res.json(user);
        } catch (error) {
            res.sendStatus(400);
        }
    };
    app.post("/api/users", createUser);

    const findUserById = async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.userId);
            res.json(user);
        } catch (error) {
            res.sendStatus(404);
        }
    };
    app.get("/api/users/:userId", findUserById);

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signin", signin);

    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };
    app.post("/api/users/account", account);

    const updateUser = async (req, res) => {
        if (req.params.userId === 'undefined') {
            res.sendStatus(400);
            return;
        }
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    app.put("/api/users/:userId", updateUser);

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    app.post("/api/users/signout", signout);
}
export default UserRoutes;

