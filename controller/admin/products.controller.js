const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helper/filterState.helper");
const objectPaginationHelper = require("../../helper/pagination.helper");
const systemConfig = require("../../config/system.js");



//[GET] admin/product/
module.exports.index = async (request, response) => {      // gắn phương thức "get" vào nhánh con router-- lấy dữ liệu gửi lên trên server
    try {
        //filterState 
        const filterState = filterStatusHelper(request);
        //end filterState

        // tạo hàm find
        const find = {
            deleted: false
        };
        //end find

        //objectPagination
        const totalProduct = await Product.countDocuments(find); // Product.countDocuments(): hàm đếm số bản ghi 
        const objectPagination = objectPaginationHelper(totalProduct, request, 4);
        console.log(objectPagination);
        //end objectPagination


        //Search
        if (request.query.keyword) {
            const regex = new RegExp(request.query.keyword, "i"); // sẽ tạo ra cú pháp regex = /request.query.keyword/i
            console.log(`${regex}`);
            find.title = regex;  // mongoose có hỗ trợ cú pháp regex
        }
        //endSearch

        // // console.log(request.query.keyword);
        //// console.log(request);


        // bộ lọc
        if (request.query.status) {              //thử xem bên phía client có gửi phản hồi về server thông qua request không 
            //query là 1 phương thức của request chứa 1 object {status:active} or{status:inactive}
            find.status = request.query.status; //nếu mà status='active' or 'inactive' thì thêm vào object find{}
        }
        // end bộ lọc


        //// console.log(request);
        // //console.log(request.query.status);
        // tìm sản phẩm theo find
        const products = await Product.find(find)
            .sort({
                position: "desc"              // kiểu giống find trỏ vào database theo key position
            })
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip); // xuất ra màn hình objectPagination.limitItems(4) sp mỗi trang
        //// console.log(products);
        response.render("admin/pages/products/index.pug", {
            pagetitle: " trang danh sách sản phẩm",
            products: products,   // trả danh sách sản phẩm gán vào biến products để file pug ở thư mục view dùng được biến products
            filterState: filterState, // dùng để thiết lập các nút của bộ lọc
            keyword: request.query.keyword,// để in ra chữ mình vừa muốn tìm ra giao diện
            objectPagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        response.redirect(`/${systemConfig.prefixAdmin}/products`); // quay lại trang sản phẩm
    }

};

//[PATCH] admin/product/change-status/:status/:id
module.exports.changeStatus = async (request, response) => {   //lấy dữ liệu của form gửi lên url
    console.log(request.params);

    const status = request.params.status;
    const id = request.params.id;
    await Product.updateOne({    // cập nhật lại 1 bản ghi
        _id: id
    }, {
        status: status
    })
    console.log(status);
    console.log(id);

    request.flash('success', 'update trạng thái thành công!'); // key success tự động lưu vào biến messages

    response.redirect("back"); // lùi lại trang vừa click

};

//[PATCH] admin/product/change-multi
module.exports.changeMulti = async (request, response) => {  //lấy dữ liệu theo dữ liệu của form gửi lên server thông qua bodyParser:giúp lấy dữ liệu từ form của HTML dưới dạng 'parse application/x-www-form-urlencoded' thành mã js
    const type = request.body.type;      // phải có bodyParser thì dữ liệu từ form mới gửi lên server được và lưu vào biến body
    const ids = request.body.ids;
    const array = ids.split(", ");        // biến chuỗi thành mảng
    console.log(request);
    console.log(request.body);
    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: { $in: array }             // đọc từng id trong mảng
            }, {
                status: type
            });

            request.flash('success', 'update trạng thái thành công!'); // key success tự động lưu vào biến messages
            break;
        case "delete_all":
            await Product.updateMany({
                _id: { $in: array }             // đọc từng id trong mảng
            }, {
                deleted: true,
                deleteAt: new Date()
            });
            request.flash('success', 'xóa sản phẩm thành công!'); // key success tự động lưu vào biến messages
            break;
        case "change_position":
            for(const item of array){
                let [id,position]=item.split("-");// lấy ra id và position trong 1 chuỗi của từng vị trí trong mảng dùng destructuring
                position=parseInt(position); // chiểu position thành kiểu number cho phù hợp với model

                await Product.updateOne({// update từng vị trí của sản phẩm trong database
                    _id: id             // đọc từng id trong mảng
                }, {
                    position: position
                });

            }

            request.flash('success', 'thay đổi vị trí thành công!'); // key success tự động lưu vào biến messages
            break;
    }
    response.redirect("back");// lùi lại trang vừa click
};

//[PATCH] admin/product/delete/:id
module.exports.delete = async (request, response) => {
    const id = request.params.id;
    console.log(request);


    await Product.updateOne({    // cập nhật lại 1 bản ghi
        _id: id
    }, {
        deleted: true,
        deleteAt: new Date()
    })

    console.log(id);
    request.flash('success', 'xóa sản phẩm thành công!'); // key success tự động lưu vào biến messages
    // response.send("ok");
    response.redirect("back"); // lùi lại trang vừa click

}


//[GET] admin/product/create
module.exports.create = async (request, response) => {
   
    response.render("admin/pages/products/create.pug");

}

//[POST] admin/product/create
module.exports.createPOST = async (request, response) => {
   
    request.body.price=parseInt( request.body.price);
    request.body.discountPercentage=parseInt( request.body.discountPercentage);
    request.body.stock=parseInt( request.body.stock);
    
    if(request.body.position==""){
        const countProduct= await Product.countDocuments();
        request.body.position= countProduct +1;
    }else{
        request.body.position=parseInt( request.body.position);
    }
    // console.log(request);
    console.log(request.file);
    // console.log(request.body);


    if(request.file && request.file.filename) { // nếu có thì tạo ra đường dẫn cho thuộc tính thumbnail trong request.body
        request.body.thumbnail = `/uploads/${request.file.filename}`; // nếu chạy dưới locallhost thì mặc định chạy vào public rùi dó đó cứ / thẳng vào upload 
      }
    
    // response.send("ok");
    const product= new Product(request.body);// tạo mới 1 sản phẩm
    await product.save();// lư sản phẩm vào database
   
    request.flash('success', 'thêm mới sản phẩm thành công!'); // key success tự động lưu vào biến messages

    response.redirect(`/${systemConfig.prefixAdmin}/products`); // quay lại trang sản phẩm

}

//[GET] admin/product/edits/:id
module.exports.edits = async (request, response) => {
    try {                                       // phòng trừng hợp client điền linh tinh trên URL
        const id =request.params.id;
    console.log(id);
    // console.log(request.body);
  
    const product= await Product.findOne({  // phải tìm được database của sp đó đã mới tiếp tục được
        _id:id,
        deleted:false

    });
    console.log(product);
    response.render("admin/pages/products/edits.pug",{
        product:product
    });
    } catch (error) {
        request.flash('error', 'cập nhật sản phẩm thất bại !'); // key success tự động lưu vào biến messages
        response.redirect(`/${systemConfig.prefixAdmin}/products`); // quay lại trang sản phẩm

        
    }

}
//[PATCH] admin/product/edits/:id
module.exports.editsPatch = async (request, response) => {
   
    try {
        const id= request.params.id;
        console.log(id);
        console.log("biến request đâu ?");
        console.log(request);
        console.log("biến request.file đâu ?");
        console.log(request.file);
        console.log("biến request.body đâu ?");
        console.log(request.body);
        
        request.body.price=parseInt( request.body.price);// chuyển đổi thành dạng number
        request.body.discountPercentage=parseInt( request.body.discountPercentage);// chuyển đổi thành dạng number
        request.body.stock=parseInt( request.body.stock);// chuyển đổi thành dạng number
        request.body.position=parseInt( request.body.position);// chuyển đổi thành dạng number
    
        if(request.file && request.file.filename) { // nếu có thì tạo ra đường dẫn cho thuộc tính thumbnail trong request.body
           
            request.body.thumbnail = `/uploads/${request.file.filename}`; // nếu chạy dưới locallhost thì mặc định chạy vào public rùi dó đó cứ / thẳng vào upload 
           
          }
          console.log(request.body);
    
       await Product.updateOne({// sửa lại database
            _id:id,
            deleted:false
        },request.body);
    
        request.flash('success', 'cập nhật sản phẩm thành công!'); // key success tự động lưu vào biến messages
        response.redirect(`/${systemConfig.prefixAdmin}/products`); // quay lại trang sản phẩm
        // response.redirect("back");
        // response.send("ok");
    } catch (error) {
        request.flash('error', 'cập nhật sản phẩm thất bại !'); // key success tự động lưu vào biến messages
        response.redirect(`/${systemConfig.prefixAdmin}/products`); // quay lại trang sản phẩm

    }
    
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
      const id = req.params.id;
  
      const product = await Product.findOne({
        _id: id,
        deleted: false
      });
  
      console.log(product);
  
      res.render("admin/pages/products/details", {
        pageTitle: "Chi tiết sản phẩm",
        product: product
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}