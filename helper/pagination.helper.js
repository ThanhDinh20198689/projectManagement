module.exports=  (totalProduct,request,limitItems)=>{
    const objectPagination={
        currentPage:1,
        limitItems:limitItems
   };
   
   
  
   
   
   objectPagination.totalPage= Math.ceil(totalProduct/objectPagination.limitItems);// Math.ceil() để làm tròn lên 
//    console.log(  objectPagination.totalPage);
   
   //Pagination
   if(request.query.page){
       objectPagination.currentPage= parseInt(request.query.page);// chia trang,  parseInt(): chuyển string  thành interger
   }
   objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItems;
   //end Pagination
   return objectPagination;
}