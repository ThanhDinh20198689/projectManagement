// js này đã được áp dụng vào tất cả trang /admin
console.log("ok admin");
// button status ( gửi URL bằng link có chứa query)
const buttonStatus = document.querySelectorAll("[button-status]");  // muốn lấy ra nút với thuộc tính tự định nghĩa phải đưa vào "[]""
//// console.log(buttonStatus);
if (buttonStatus.length > 0) {
    // dựa vào đường link URL "window.location.href"nó tạo 1 location(object URL) mới 
    let url = new URL(window.location.href);  //Tạo một đối tượng URL từ địa chỉ URL đầy đủ của trang web, bao gồm cả giao thức, tên miền, đường dẫn, tham số truy vấn và mảnh.
    //xong gán URL vừa được tạo vào url
    //// console.log(url);
    //// console.log(window.location);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            console.log(status);
            if (status) {                          // xem có giá trị của status không, nếu có thì  gắn key vs value của status vào sau dấu "?" của url
                url.searchParams.set("status", status);        //Trong ngữ cảnh của URL, thuộc tính searchParams là một đối tượng URLSearchParams. Đối tượng này cung cấp các phương thức để thêm, cập nhật, xóa và lấy giá trị của các tham số truy vấn trong URL.
            } else {                  //.set(name, value): Thêm hoặc cập nhật giá trị của tham số truy vấn(query parameters) với tên name và giá trị value vào.
                // Query parameter là một cách truyền thông tin hoặc tham số từ client (trình duyệt web) lên server thông qua URL. Đối với URL, phần query parameter thường xuất hiện sau dấu "?" và có thể bao gồm một hoặc nhiều cặp tên giá trị được ngăn cách bởi dấu "&".
                // ex: https://www.example.com/search?q=keyword&page=1&sort=asc 

                url.searchParams.delete("status");            //.delete(name): Xóa tham số truy vấn với tên name.
            }

            window.location.href = url.href; // gán url mới vào URL của window
        });

    });
}

//end button status

//form Search( nếu không có những hàm này khi chọn bộ lọc xong tìm thì bộ tìm kiếm sẽ dựa vào link gốc để thêm key)( gửi URL bằng link có chứa query)
const formSearch = document.querySelector("#form-search"); // sử dụng querySelector để chọn 1 nút
//// console.log(formSearch);
if (formSearch) {
    let url = new URL(window.location.href);      // viết 
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("in ra \n");
        console.log(event);
        const keyword = event.target.elements.keyword.value;  // lấy giá trị trong form
        console.log(keyword);
        if (keyword) {                                            // xem có giá trị của status không, nếu có thì  gắn key vs value của status vào sau dấu "?" của url
            url.searchParams.set("keyword", keyword);        //Trong ngữ cảnh của URL, thuộc tính searchParams là một đối tượng URLSearchParams. Đối tượng này cung cấp các phương thức để thêm, cập nhật, xóa và lấy giá trị của các tham số truy vấn trong URL.
        } else {                                                //.set(name, value): Thêm hoặc cập nhật giá trị của tham số truy vấn(query parameters) với tên name và giá trị value vào.
            // Query parameter là một cách truyền thông tin hoặc tham số từ client (trình duyệt web) lên server thông qua URL. Đối với URL, phần query parameter thường xuất hiện sau dấu "?" và có thể bao gồm một hoặc nhiều cặp tên giá trị được ngăn cách bởi dấu "&".
            // ex: https://www.example.com/search?q=keyword&page=1&sort=asc 

            url.searchParams.delete("keyword");            //.delete(name): Xóa tham số truy vấn với tên name.
        }
        window.location.href = url.href; // gắn lại link 
    });         // hết câu lệnh là submit ngay
}


//end form Search
////-------------------------------------------------------------------------------------------------------------------------------------------
//QueryString là một phần của URL mà chứa thông tin tham số truy vấn (query parameters). Nó xuất hiện sau dấu "?" trong URL và có thể chứa một hoặc nhiều cặp tên giá trị, mỗi cặp được ngăn cách bởi dấu "&".

//  Ví dụ về một URL với queryString:

//  https://www.example.com/search?q=keyword&page=1&sort=asc
//  Trong ví dụ này:
//
//  '?' là dấu phân tách giữa URL và queryString.
//  q=keyword, page=1, và sort=asc là các cặp tên giá trị (query parameters).
//  Dấu "&" được sử dụng để ngăn cách giữa các cặp tên giá trị.

//QueryString thường được sử dụng để truyền dữ liệu từ client (trình duyệt web) lên server qua URL, chẳng hạn như khi thực hiện các yêu cầu HTTP GET. Server sau đó có thể đọc và xử lý queryString để cung cấp kết quả tương ứng hoặc thực hiện các thao tác khác.

////---------------------------------------------------------------------------------------------------------------------------------------

//Pagination( gửi URL bằng link có chứa query)
const buttonPage = document.querySelectorAll("[button-pagination]");  // muốn lấy ra nút với thuộc tính tự định nghĩa phải đưa vào "[]""
if (buttonPage.length > 0) {
    // dựa vào đường link URL "window.location.href"nó tạo 1 location(object URL) mới 
    let url = new URL(window.location.href);  //Tạo một đối tượng URL từ địa chỉ URL đầy đủ của trang web, bao gồm cả giao thức, tên miền, đường dẫn, tham số truy vấn và mảnh.
    //xong gán URL vừa được tạo vào url
    buttonPage.forEach((button) => {
        button.addEventListener("click", () => {
            const PageNumber = button.getAttribute("button-pagination");
            if (PageNumber) {
                url.searchParams.set("page", PageNumber);
            } else {
                url.searchParams.delete("page");

            }
            window.location.href = url.href;
        })
    });
}
//end Pagination

// button-change-status( gửi form lên link chứa params)
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");// lấy nút có thuộc tính button-change-status
// console.log(buttonChangeStatus);
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");// lấy form
    console.log(formChangeStatus);
    const path = formChangeStatus.getAttribute("data-path");// lấy path
    console.log(path);
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status"); // lấy trạng thái của nút bấm
            const id = button.getAttribute("data-id");    // lấy id của nút 

            const statusChange = statusCurrent == "active" ? "inactive" : "active"; // nếu là active thì change thành inactive và ngược lại
            console.log(statusChange);
            console.log(statusCurrent);
            console.log(id);

            const action = `${path}/${statusChange}/${id}/?_method=PATCH`; // "/?_method=PATCH "": method muốn đổi là PATCH nhưng phương thức của form phải là POST
            console.log(action);
            formChangeStatus.action = action; // gán lại action vào action của form
            formChangeStatus.submit(); // hàm submit của js để submit form
        });
    }
    )
}


// end button-change-status

// checkbox-multi(chỉ là điểu chính các nút bên frond-end thôi)
const checkboxMulti = document.querySelector("[checkbox-multi]"); // bộ chọn theo thuộc tính tự định nghĩa-chọn cả cái table
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");// bộ chọn theo thuộc tính -chọn nút checkAll
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");// chọn các nút con checkId

    //thực hiện sự kiện trên nút checkAll
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {             // nút checkAll phải được check mới tiếp tục thực hiện cái sau
            console.log(inputCheckAll.checked);// .checked dược áp dụng nếu input có type="checkbox" trả ra true-false
            inputsId.forEach((input) => {
                input.checked = true;         // gán tất cả các nút checkId con thành true để hiện lên màn hình

            });

        } else {
            inputsId.forEach((input) => {
                input.checked = false;        // nếu ko thì gắn tất cả nút con thành false
            });
        }
    });

    //thực hiện sự kiện trên nút checkId con
    inputsId.forEach(input => {       // lặp qua từng nút con
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;// tạo 1 biến lưu những nút checkId được checked
            console.log(countChecked);
            console.log(inputsId.length);
            if (countChecked == inputsId.length) {  // nếu các nút con được check hết thì hiện checkAll không thì không hiện checkAll
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }

        })
    });
}

// end checkbox-multi

// form-change-multi( gửi form thông qua 1 đường link và phải có thư viện 'body-parser' mới có thể để js biên dịch và gắn vào biến request.body ở bên back-end được)
const formChangeMulti = document.querySelector("[form-change-multi]"); // lấy form cả ô select nữa tại form này chứa nó
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {    //submit form
        event.preventDefault();                             // ngăn chặn form gửi ngay đi
        const inputsChecked = document.querySelectorAll("input[name='id']:checked"); // tạo ra 1 nút lưu các nút được checked
        const type = event.target.elements.type.value;  // check xem giá trị trong form có giá trị gì
        console.log(type);

        if (type == "delete_all") {  // nếu chọn trúng mới thực hiện không thì vẫn chạy bình thường
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");

            if (!isConfirm) { // nếu confirm không phải là true thì return để dừng các dòng lệnh phía sau
                return;
            } else {
                alert("đã xác nhận xóa"); // nghịch thui
            }
        }
        if (inputsChecked.length > 0) {                       // nếu có chọn hơn 1 bản ghi thì
            const ids = [];                                       // tạo ra 1 biến để lưu dãy id
            const inputIds = formChangeMulti.querySelector("input[name='ids']");//chọn nút ids để gắn những id được chọn vào

            inputsChecked.forEach(input => {  // lặp qua từng nút con được checked
                const id = input.value;      // lấy id của nút con

                if (type == "change_position") { // nếu chọn trúng change_position thì sẽ thục hiện cái dưới, nếu không thì thực hiện bình thường
                    const position = input.closest("tr").querySelector("input[name='position']").value; //hàm closet() là để lấy trực tiếp node cha( ko qtam có bn node cha) của nút con đó 
                    console.log(position);
                    ids.push(`${id}-${position}`);// gắn thành 1 chuỗi gồm id-position để sau khi gửi sang back-end sẽ dùng phá vỡ cáu trúc với mảng này
                } else {
                    ids.push(id);           // gắn id đó vào biến ids vừa khởi tạo ở trên
                    console.log(ids);
                    console.log(id);
                }

            });
            inputIds.value = ids.join(", ");// biến ids thành string rồi gắn vào value của nút inputIds vừa lập ở trên(để gửi lên sever tại vì sever không gửi mảng được-đây là lúc chưa học)
            console.log(inputIds.value);
            formChangeMulti.submit(); // submit lên để back-end làm việc
        } else {             // nếu không chọn bản ghỉ nào
            alert("vui lòng chọn ít nhất 1 bản ghi");
        }
    });




}
//end form-change-multi

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
// console.log(buttonDelete);

if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("[form-delete-item]");// lấy node form( phải bỏ ở trong if tại nếu để ở ngoài thì nó sẽ tìm ngay và không thấy thì nó sẽ bị lỗi)
    const path = formDeleteItem.getAttribute("data-path"); // lấy đường dẫn ( phải bỏ ở trong if tại nếu để ở ngoài thì nó sẽ tìm ngay và không thấy thì nó sẽ bị lỗi)
    buttonDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?"); // xem có muốn xóa thật không 

            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;// gửi dữ liệu qua link URL
                formDeleteItem.action = action;// gán vào action của form mới tạo
                formDeleteItem.submit();// submit lên để back-end làm việc
            }

        });

    });


}
// End Delete item

// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = showAlert.getAttribute("data-time");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time); // sau time s thì đóng thông báo

    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden"); // css cho nút x

    });
}
//end show alert

// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (event) => {
    console.log(uploadImageInput);
    console.log(event);
    const [file] = uploadImageInput.files; // event.target chính là uploadImageInput
    // console.log(file);
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);//URL.createObjectURL là một phương thức trong JavaScript, được sử dụng để tạo một URL đặc biệt (blob URL hoặc data URL) đại diện cho một đối tượng blob hoặc file.
    }                                                    //Khi bạn muốn hiển thị hình ảnh hoặc nội dung của tệp tin trong trình duyệt mà không cần tải nó từ máy chủ, bạn có thể sử dụng URL.createObjectURL để tạo một URL dựa trên nội dung của file đó.
  });                                                       // nghĩa là gán  URL.createObjectURL(file) vào src của thẻ <img> trong file pug
}
// End Preview Image

console.log("ok");