const express= require("express");// nhung module của framework Express vào chương trình
const router=express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"

const controller=require("../../controller/clients/home.controller.js");


router.get("/",controller.home);



module.exports = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào