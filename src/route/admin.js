import express from "express";

import APIController from "../controller/APIController";
let router = express.Router();
import path from "path";
import auth from "../middleware/auth";
import multer from "multer";
import appRoot from "app-root-path";
const storage = multer.diskStorage({
  destination: "./src/public/image/",
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ),
});
const adminRoute = (app) => {
  //APi đánh giá năng lực
  router.get("/account/xemDanhGia?:id_product", APIController.getRated);
  router.post("/account/rating", APIController.rateComment);

  //---------------Admin----------------------------

  //Đăng nhập của admin
  router.post("/admin/login", APIController.handleAdminLogin);

  return app.use("/api/v1/", router);
};

export default adminRoute;
