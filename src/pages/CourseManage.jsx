import { Children, useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { fetchUserAPI } from "../apis";
import { fetchCoursesAPI, createNewCourseAPI } from "../apis";
import { courseErrorClassify } from "../utils/validator";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

let indexToEdit = -1;

function CourseManage() {
  const [courses, setCourses] = useState([]);
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("user-token"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserAPI(token);
        if (response.data.role === "admin") {
          const data = await fetchCoursesAPI(token);
          setCourses(data);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Không thể kết nối đến server!");
        throw new Error("Cant connect to the server!");
      }
    };
    fetchData();
  }, []);

  let majorsData = [
    {
      _id: "65f2abc1934f2f23f4f2f534",
      name: "Công nghệ thông tin",
    },
    {
      _id: "65f2abc1934f2f23f445f534",
      name: "Marketing",
    },
    {
      _id: "65f2abc1934f2f99f4f2f534",
      name: "Tài chính ngân hàng",
    },
    {
      _id: "65f2abc1934f2f23f4f2f111",
      name: "Luật",
    },
  ];
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [courseMajor, setCourseMajor] = useState("");
  const [preRequireCourse, setPreRequireCourse] = useState("");
  const [majors, setMajors] = useState(majorsData);
  const [isEdit, setIsEdit] = useState(false);
  const courseIdRef = useRef(null);
  const handleAddCourse = async () => {
    if (
      courseId &&
      courseName &&
      courseCredits &&
      courseMajor != "default" &&
      courseMajor != "" &&
      preRequireCourse != "default"
    ) {
      try {
        const newCourse = {
          courseId: courseId,
          name: courseName,
          preRequireCourse: preRequireCourse,
          courseCredits: courseCredits,
          majorId: courseMajor,
        };
        const createdCourse = await createNewCourseAPI(newCourse);
        console.log(createdCourse);
        setCourses([...courses, newCourse]);
        cancelActivity();
        toast.success("Thêm môn học thành công");
      } catch (error) {
        console.log(error);
        toast.error(courseErrorClassify(error), {
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      toast.error("Vui lòng không bỏ trống thông tin", {
        position: "top-center",
        theme: "colored",
      });
      courseIdRef.current.focus();
    }
  };

  const handleEditCourse = (index) => {
    setIsEdit(true);
    indexToEdit = index;
    setCourseId(courses[index].courseId);
    setCourseName(courses[index].name);
    setCourseCredits(courses[index].courseCredits);
    setPreRequireCourse(courses[index].preRequireCourse);
    setCourseMajor(courses[index].majorId);
  };

  const confirmEdit = () => {
    if (
      courseId &&
      courseName &&
      courseCredits &&
      courseMajor != "default" &&
      courseMajor != "" &&
      preRequireCourse != "default"
    ) {
      courses[indexToEdit].courseId = courseId;
      courses[indexToEdit].name = courseName;
      courses[indexToEdit].courseCredits = courseCredits;
      courses[indexToEdit].major = courseMajor;

      setCourses([...courses]);

      cancelActivity();
    } else {
      toast.error("Vui lòng không bỏ trống thông tin", {
        position: "top-center",
        theme: "colored",
      });
      courseIdRef.current.focus();
    }
  };

  const handleDeleteCourse = (index) => {
    const coursesToEdit = [...courses];
    coursesToEdit.splice(index, 1);
    setCourses(coursesToEdit);
  };

  const cancelActivity = () => {
    setCourseCredits("");
    setCourseId("");
    setCourseMajor("");
    setPreRequireCourse("");
    setCourseName("");
    setIsEdit(false);
    indexToEdit = -1;
  };
  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />

      <div className="control-container my-3 d-flex flex-wrap gap-2">
        <div className="control-item">
          <label htmlFor="courseId" className="form-label">
            Mã môn học
          </label>
          <input
            ref={courseIdRef}
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
            }}
            type="text"
            className="form-control"
            id="courseId"
          />
        </div>
        <div className="control-item">
          <label htmlFor="courseName" className="form-label">
            Tên môn học
          </label>
          <input
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="courseName"
          />
        </div>
        <div className="control-item">
          <label htmlFor="courseCredit" className="form-label">
            Số tín chỉ
          </label>
          <input
            value={courseCredits}
            onChange={(e) => {
              setCourseCredits(e.target.value);
            }}
            type="text"
            className="form-control"
            id="courseCredit"
          />
        </div>
        <div className="control-item">
          <label htmlFor="courseMajor" className="form-label">
            Khoa
          </label>
          <select
            value={courseMajor}
            className="form-select"
            id="courseMajor"
            defaultValue={"default"}
            onChange={(e) => setCourseMajor(e.target.value)}
          >
            <option value="default">Chọn khoa</option>
            {majors.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div className="control-item">
          <label htmlFor="preRequireCourse" className="form-label">
            Môn tiên quyết
          </label>
          <select
            value={preRequireCourse}
            className="form-select"
            id="preRequireCourse"
            defaultValue={"default"}
            onChange={(e) => setPreRequireCourse(e.target.value)}
          >
            <option value="default" selected>
              Chọn môn tiên quyết
            </option>
            <option value="no">Không có môn tiên quyết</option>
            {courses.map((c, i) => (
              <option key={i} value={c.courseId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="control-item"></div>
        <div className="control-item d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => (isEdit ? confirmEdit() : handleAddCourse())}
          >
            {!isEdit ? "Thêm môn học mới" : "Cập nhật môn học"}
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => cancelActivity()}
          >
            Hủy thao tác
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã môn</th>
              <th scope="col">Tên môn học</th>
              <th scope="col">Số tín chỉ</th>
              <th scope="col">Khoa</th>
              <th scope="col">Môn tiên quyết</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{c.courseId}</td>
                <td>{c.name}</td>
                <td>{c.courseCredits}</td>
                <td>{majors.find((m) => m._id == c.majorId)?.name}</td>
                <td>
                  {courses.find(
                    (course) => course.courseId == c.preRequireCourse
                  )?.name || "Không"}
                </td>
                <td>
                  <button
                    onClick={() => handleEditCourse(index)}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteCourse(index)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseManage;
