const multer = require('multer')// thư viên để có thể upload được ảnh( chỉ sử dụng bên file rounter)

module.exports=()=>{
    const storage = multer.diskStorage({//Khi bạn sử dụng diskStorage khi cấu hình Multer, nó sẽ sử dụng nó để xác định nơi lưu trữ và cách đặt tên cho tệp tin khi được tải lên từ máy khách lên máy chủ.
        destination: function (req, file, cb) {     //destination: Đây là nơi tệp tin sẽ được lưu trữ trên máy chủ. Trong đoạn mã trên, tệp tin sẽ được lưu trong thư mục ./public/uploads.
          cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {        //filename: Đây là cách tên tệp tin được đặt. Trong đoạn mã trên, tên tệp tin sẽ được tạo dựa trên thời gian hiện tại và một số ngẫu nhiên để đảm bảo tính duy nhất.
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, prefix + "-" + file.originalname);
        }
      })
      return storage;
}