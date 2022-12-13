import { Express } from "express";

import PageRouter from "./page";
import LinkRouter from "./link";
import LoginRouter from "./login";
import SignupRouter from "./signup";
import AppearanceRouter from "./appearance";
import SettingsRouter from "./settings";

const AppRoutes = (app: Express) => {
  const pageRouter = PageRouter();
  const linkRouter = LinkRouter();
  const loginRouter = LoginRouter();
  const signupRouter = SignupRouter();
  const settingsRouter = SettingsRouter();
  const appearanceRouter = AppearanceRouter();

  app.use(pageRouter.routerPrefix, pageRouter.route());
  app.use(linkRouter.routerPrefix, linkRouter.route());
  app.use(loginRouter.routerPrefix, loginRouter.route());
  app.use(signupRouter.routerPrefix, signupRouter.route());
  app.use(settingsRouter.routerPrefix, settingsRouter.route());
  app.use(appearanceRouter.routerPrefix, appearanceRouter.route());
};

export default AppRoutes;
