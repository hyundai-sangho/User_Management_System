const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

/**
 * @description 루트 페이지
 * @method GET /
 */
route.get("/", services.homeRoutes);

/**
 * @description 사용자 추가
 * @method GET /add-user
 */
route.get("/add-user", services.add_user);

/**
 * @description 사용자 정보 갱신
 * @method GET /update-user
 */
route.get("/update-user", services.update_user);

// API
route.post("/api/users", controller.createUser);
route.get("/api/users", controller.findUser);
route.put("/api/users/:id", controller.updateUser);
route.delete("/api/users/:id", controller.deleteUser);

module.exports = route;
