import express from "express";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";
import SocialModel from "../models/social.model";

export default function SocialRouter() {
  const jsonParser = bodyParser.json();

  const route = () => {
    const router = express.Router();

    router.post("/", checkAuth, jsonParser, async (req, res) => {
      const { type, href } = req.body;

      console.log(req.body)
      if (!type || !href) return res.status(200).json({ status: false, message: "type and href requred in body." });

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        const isExist = page.socials.some((social: any) => social.type == type);

        if (isExist) return res.status(200).json({ status: false, message: "This social already exit in this page." });

        const social = new SocialModel({ type, href });
        page.socials.push(social);

        const savedPage = await page.save();

        if (!savedPage) return res.status(200).json({ status: false, message: "Unknown error occured." });

        return res.status(200).json({ status: true, socials: savedPage.socials });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/social`,
  };
}
