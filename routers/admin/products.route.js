const express = require("express");// nhung module của framework Express vào chương trình
const router = express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"
const multer = require('multer')// thư viên để có thể upload được ảnh( chỉ sử dụng bên file rounter)

const storageMulter=require("../../helper/storageMulter.helper");// module khởi tạo tên ảnh và địa chỉ để lưu ảnh vào đó
const upload = multer({ storage: storageMulter() })// Bạn sử dụng đối tượng upload để xử lý quá trình tải lên (upload) của Multer. Khi bạn muốn chấp nhận tệp tin từ máy khách, bạn sẽ sử dụng upload.single() hoặc upload.array() trong các tuyến đường của ứng dụng Express.

// const uploadBefore = multer({ dest: './public/uploads' })// đường link để lưu file uploads phải bắt đầu bằng ./public/ do mongoose nó bắt thế ghi khác nà nó cho vào file khác đấy

const controller = require("../../controller/admin/products.controller.js");
const validate = require("../../validates/admins/product.validate.js");


router.get("/", controller.index);


router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);


router.delete("/delete/:id", controller.delete);

router.get("/create", controller.create);



router.post(
    "/create",
    upload.single('thumbnail'), // key trong upload.single('key') phải trùng với tên của ô input cần upload ảnh thì mới post lên đc
    validate.createPOST,
    controller.createPOST
); 

router.get(
    "/edits/:id",

     controller.edits);

router.patch(
    "/edits/:id", 
    upload.single('thumbnail'), // key trong upload.single('key') phải trùng với tên của ô input cần upload ảnh  thì mới post lên đc
    validate.createPOST,
    controller.editsPatch);

router.get("/detail/:id", controller.detail);

module.exports = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào