import express from "express";
import OrderController from "../controller/OrderController";

let router = express.Router();
import auth from "../middleware/auth";

const orderRoute = (app) => {
  //Thanh toán đơn hàng
  router.post("/pay", auth.authenUser, OrderController.pay);

  //API đặt hàng mới hoàn toàn
  router.post("/order-pay", auth.authenUser, OrderController.datHangNew);

  //API lịch sử đơn đặt hàng
  router.get(
    "/account/order-history-by-status/:id_account/:status",
    OrderController.orderHistory
  );
  router.get(
    "/account/order-history-by-account/:id_account",
    auth.authenUser,
    OrderController.orderAccount
  );
  //Xem đon đặt hàng
  router.get("/order", auth.authenUser, OrderController.getOrder);

  //Đơn hàng
  router.get(
    "/admin/get-orders",
    auth.authenAdmin,
    OrderController.getOrderNew
  );
  router.get("/admin/detail-order/:id_order", OrderController.getDetailOrder);
  // router.get("/admin/detail/:id_order", OrderController.detail);
  router.post("/admin/confirm-order/:id_order", OrderController.confirmOrder);
  router.post("/admin/complete-order/:id_order", OrderController.completeOrder);
  router.post("/admin/cancel-order/:id_order", OrderController.cancelOrder);

  //Doanh số
  router.get("/admin/revenue-year/:year", OrderController.xemDoanhSo);

  //Doanh số theo tháng
  router.get(
    "/admin/revenue-month/:month/:year",
    OrderController.xemDoanhSoThang
  );

  return app.use("/api/", router);
};

export default orderRoute;
