const express= require("express");// nhung module của framework Express vào chương trình
const session = require('express-session');// nhứng vào để hỗ trợ dùng flash do express ko hỗ trợ nữa
const cookieParser = require('cookie-parser');// nhứng vào để hỗ trợ dùng flash do express ko hỗ trợ nữa
const flash = require('express-flash');//  nhúng vào dùng để hiển thị thông báo nhanh
const methodOverride = require('method-override');// nhúng thư viện ghi đè http vào
const bodyParser = require('body-parser')// nhúng thư viện chuyển đổi dữ liệu từ form của html để js đọc hiểu được

const dotenv= require("dotenv");// nhúng biến môi trường vào

const systemConfig=require("./config/system.js");// nhúng file sửa tên vào
const database=require("./config/database.js");// nhung module của file ./config/database.js

const routeOfAdmin=require("./routers/admin/index.route.js"); // nhúng 1 module gồm những tất cả các hàm route con trong file"./routers/admin/index.route.js"
const routeOfClient= require("./routers/clients/index.route.js"); // nhúng 1 module gồm những tất cả các hàm route con trong file "./routers/clients/index.route.js"

// muốn dùng dotenv thì phải viết câu lệnh này lên đầu trước khi dùng{
dotenv.config();//thiết lập các biến môi trường từ file .env vào file index.js sau đó dùng câu lệnh process.env để vào file .env để đọc các biến môi trường
//                                                                    }

console.log(process.env.MONGO_URL) // nghịch chơi chơi

// gọi hàm connect của module database có link file "./config/database.js" vào đây
database.connect();

const app= express();// dùng thư viện express vào để biến app thành đối tượng ứng dụng Express chính
const port=process.env.PORT;// nhúng đường dẫn = cách đọc các biến môi trường từ file ".env" 


app.use(cookieParser('keyafsfs')); // key ghi bừa đấy miễn là duy nhất (để bảo mật tin nhắn) là được // do express không hỗ trợ cookieParser nữa nên phải nhứng thêm thư viện cookieParser để dùng được flash
app.use(session({ cookie: { maxAge: 60000 }})); // do express không hỗ trợ session nữa nên phải nhứng thêm thư viện session để dùng được flash
app.use(flash());// sử dụng thư viện flash

app.use(methodOverride('_method')); // phải đặt sau app để sử dụng ghi đè phương thức

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // giúp lấy dữ liệu từ form của HTML dưới dạng 'parse application/x-www-form-urlencoded' thành mã js


app.set("views",`${__dirname}/views`);// Cấu hình tùy chọn "views" cho đường dẫn đến thư mục templates engine

app.set("view engine","pug");//"view engine": Xác định template engine được sử dụng (ví dụ: "pug")

app.use(express.static(`${__dirname}/public`));//sử dụng các nguồn từ mục public


app.locals.PrefixAdmin= systemConfig.prefixAdmin; // dùng app.locals để sử dụng được dữ liệu của prefixAdmin gán vào biến PrefixAdmin(tự đặt) trong tất cả các file pug mà không cần thông qua controller
   //   chỉ dùng được trong các file pug thôi chứ ko dùng được trong các file js khác

//router Admin được nhúng vào đây{
routeOfAdmin.routeAdmin(app);
//                                }

// Router Client được nhúng vào đây{...........

routeOfClient.routeClient(app);// or chỉ nhúng 'routeOfClient(app);' thôi và xóa tên routeClient bên route.index.js đi, nếu route.index.js chỉ có 1 module cần export

//.....................................   }

app.listen(port,()=>{
    console.log(`app listenning on port ${port}`);
});