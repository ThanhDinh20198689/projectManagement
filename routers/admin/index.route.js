const dashboardRouter = require("./dashboard.route.js");// nhúng kết quả export trong file "./product.rout.js" vào đây
const systemConfig = require("../../config/system.js");
const productRounter= require("./products.route.js");// nhúng kết quả export trong file "./products.route.js" vào đây



module.exports.routeAdmin= (app)=>{         //đây là cú phát common js có tác dụng giống với "export const RouteOfClient=()=>{} "

    // app.get("/",(request,respond)=>{
    //     console.log("------------------");
    
    //     console.log(homeRoutes);
    // })
    const PATH_ADMIN=`/${systemConfig.prefixAdmin}`; // để tiện sửa 

    app.use(`${PATH_ADMIN}/dashboard`,dashboardRouter);            // sử dụng tất cả những router con được export từ file "./home.route" gán vào homeRoutes
    app.use(`${PATH_ADMIN}/products`,productRounter);            // sử dụng tất cả những router con được export từ file "./home.route" gán vào homeRoutes


    // app.use("/products",productRoutes); // sử dụng tất cả những router con được export từ file "./product.route" gán vào productRoutes
    
}


// export const RouteOfClient=()=>{} // đây là cú pháp ES6 không dùng trong expressjs