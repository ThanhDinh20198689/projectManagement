//[GET] /product/
module.exports.home= (request,response)=>{                      // gắn phương thức "get" vào nhánh con router
    response.render("client/pages/home/index.pug",{
        pagetitle:" trang chủ"
    });
};
