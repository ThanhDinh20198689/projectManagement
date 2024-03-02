module.exports=(request) =>{
    const filterState=[          // tạo các trạng thái lọc
        {
            name:"Tất Cả",
            State:"",
            Class:""
        },
        {
            name:"Hoạt Động",
            State:"active",
            Class:""
        },
        {
            name:"Dừng Hoạt Động",
            State:"inactive",
            Class:""
        }
    ]          

    if(request.query.status){   // kiểm tra xem có phản hồi từ client không nếu có thì thêm class 'active' vào thuộc tính class của nút bấm filterState 
        const index=filterState.findIndex(item=> item.State==request.query.status);// tìm vị trí phản hồi của nút bấm đó
        console.log(`vị trí số ${index}`);
        filterState[index].Class="active";// gắn class của bút bấm đó thành 'active'

    }else{
        filterState[0].Class="active";// nếu không có phản hồi query parameter thì mặc định là vị trí 0 được thêm class:"active"
    }
    //// console.log(filterState);
    return filterState;
}