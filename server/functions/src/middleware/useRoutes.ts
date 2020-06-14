import usersRoutes from "../routes/users";
import screamsRoutes from "../routes/screams";
import {Application} from "express";

export const useRoutes = (app: Application) => {
    app.use(usersRoutes);
    app.use(screamsRoutes);
};
