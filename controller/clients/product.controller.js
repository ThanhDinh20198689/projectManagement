const Product=require("../../model/product.model")


//[GET] /product/
module.exports.index= async (request,response)=>{                      // gắn phương thức "get" vào nhánh con router
    const product= await Product.find({
        status : "active",
        deleted: false
    }) .sort({
        position: "desc"              // kiểu giống find trỏ vào database theo key position
    });// tìm tất cả các mảng data với điều kiện  status : "active" ,
    //                                              deleted: false

    for(const items of product){
        items.priceNew=items.price-(1-items.discountPercentage/100);
        items.priceNew=items.priceNew.toFixed(0);
    }
    console.log(product);

    response.render("client/pages/products/index.pug",{
        pagetitle:" trang san pham",
        products: product

    });
};


//[GET] /product/edit
module.exports.edit= (request,response)=>{                      // gắn phương thức "get" vào nhánh con router
    response.send("trang chỉnh sửa sản phẩm");
};

// //[GET] /product/create
// module.exports.create= (request,response)=>{                      // gắn phương thức "get" vào nhánh con router
   
// };

// [GET] /products/:slug
module.exports.detail = async (request,response) => {
    try {
        const slug = request.params.slug;
        
        if(slug){// kiểm tra xem có slug hay không
        const product = await Product.findOne({
          slugTest: slug,
          deleted: false,
          status: "active"
        });
    
    
    
        console.log("product đâu ?");
        console.log(product);
    
        response.render("client/pages/products/details", {
          pageTitle: product.title,
          product: product
  })
  }

      } catch (error) {
        console.log("không có slug")
        response.redirect("/");
    }
   
}
