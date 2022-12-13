import express from "express";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import checkAuth from "../middlewares/checkAuth";

const jsonParser = bodyParser.json();

export default function AppearanceRouter() {
  const route = () => {
    const router = express.Router();

    router.post("/title", checkAuth, jsonParser, async (req, res) => {
      const { title } = req.body;

      if (!title) return res.status(200).json({ status: false, message: "Title length cannot be zero." });
      if (title.length > 30)
        return res.status(200).json({ status: false, message: "Title length cannot be longer than 30 character." });

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.profileTitle = title;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/description", checkAuth, jsonParser, async (req, res) => {
      const { description = "" } = req.body;

      if (description.length > 80)
        return res
          .status(200)
          .json({ status: false, message: "Description length cannot be longer than 80 character." });

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.profileDescription = description;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/color", checkAuth, jsonParser, async (req, res) => {
      const { type, color } = req.body;

      if (!type || !color) {
        res.statusMessage = "type and color required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        if (type == "text") {
          page.styles.link.color = color;
        } else if (type == "background") {
          page.styles.link.backgroundColor = color;
        } else if (type == "border") {
          page.styles.link.borderColor = color;
        } else if (type == "shadow") {
          page.styles.link.shadowColor = color;
        }

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/style", checkAuth, jsonParser, async (req, res) => {
      const { style } = req.body;

      if (!style) {
        res.statusMessage = "style required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.link.style = style;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/fontColor", checkAuth, jsonParser, async (req, res) => {
      const { fontColor } = req.body;

      if (!fontColor) {
        res.statusMessage = "fontColor required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.fontColor = fontColor;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/fontFamily", checkAuth, jsonParser, async (req, res) => {
      const { fontFamily } = req.body;

      if (!fontFamily) {
        res.statusMessage = "fontFamily required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.fontFamily = fontFamily;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/backgroundColor", checkAuth, jsonParser, async (req, res) => {
      const { backgroundColor } = req.body;

      if (!backgroundColor) {
        res.statusMessage = "fontFamily required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.backgroundColor = backgroundColor;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    router.post("/backgroundType", checkAuth, jsonParser, async (req, res) => {
      const { backgroundType } = req.body;

      if (!backgroundType) {
        res.statusMessage = "fontFamily required for the body.";
        return res.status(400).end();
      }

      try {
        const page = await PageModel.findById(req.authContext?.pageId);

        if (!page) return res.status(200).json({ status: false, message: "Page not found." });

        page.styles.backgroundType = backgroundType;

        await page.save();

        return res.status(200).json({ status: true });
      } catch (error) {
        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/appearance`,
  };
}
