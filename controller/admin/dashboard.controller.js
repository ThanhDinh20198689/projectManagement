//[GET] /product/
module.exports.index= (request,response)=>{                      // gắn phương thức "get" vào nhánh con router
    response.render("admin/pages/dashboard/index.pug",{
        pagetitle:" trang tổng quan"
    });
};
