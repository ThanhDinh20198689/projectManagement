module.exports.createPOST = async (request, response,next) => {
    if(!request.body.title){
        request.flash("error","Tiêu đề không được để trống!");
        response.redirect("back");
        return; // phải có return để chương trình không chạy tiếp xuống dưới( nếu không sẽ lỗi chương trình)
    }
    if(request.body.title.length<5 ){
        request.flash("error","Tiêu đề không được ít hơn 5 ký tự!");
        response.redirect("back");
        return; // phải có return để chương trình không chạy tiếp xuống dưới( nếu không sẽ lỗi chương trình)
    }
    console.log("pass");
    next();
}