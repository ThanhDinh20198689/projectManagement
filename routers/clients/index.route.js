const productRoutes = require("./product.route");// nhúng kết quả export trong file "./product.rout.js" vào đây
const homeRoutes = require("./home.route");// nhúng kết quả export trong file "./product.rout.js" vào đây




module.exports.routeClient= (app)=>{         //đây là cú phát common js có tác dụng giống với "export const RouteOfClient=()=>{} "

    // app.get("/",(request,respond)=>{
    //     console.log("------------------");
    
    //     console.log(homeRoutes);
    // })

    app.use("/",homeRoutes);            // sử dụng tất cả những router con được export từ file "./home.route" gán vào homeRoutes

    app.use("/products",productRoutes); // sử dụng tất cả những router con được export từ file "./product.route" gán vào productRoutes
    
}


// export const RouteOfClient=()=>{} // đây là cú pháp ES6 không dùng trong expressjs