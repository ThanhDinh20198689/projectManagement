const express= require("express");// nhung module của framework Express vào chương trình
const router=express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"
const controller = require("../../controller/clients/product.controller"); // nhúng tất cả module của file product.controller.js


router.get("/",controller.index);

// router.get("/create",controller.create);

// router.get("/details",controller.detail);

router.get("/edit",controller.edit);

router.get("/:slug", controller.detail);

module.exports = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào