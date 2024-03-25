export const courseErrorClassify = (error) => {
    const message = error.response.data.error
    let errorMessage = "Nhập sai định dạng"
    if (message.includes("MongoServerError")) {
      errorMessage = "Mã môn học đã tồn tại"
    }
    else if (message.includes("courseId")) {
      errorMessage = "Nhập sai định dạng mã môn học"
    }
    else if (message.includes("courseCredits")) {
      errorMessage = "Số tín chỉ phải từ 1 đến 10"  
    }
    return errorMessage
}
