import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { fetchUserAPI } from "../apis";
import {
    fetchMajorsAPI,
    createNewMajorAPI,
    editMajorAPI,
    deleteMajorAPI,
} from "../apis";
import { courseErrorClassify, majorErrorClassify } from "../utils/validator";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

let indexToEdit = -1;

function MajorManage() {
    const [majors, setMajors] = useState([]);
    const { userData } = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("user-token"));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetchUserAPI(token);
                if (respone.data.role == "admin") {
                    const data = await fetchMajorsAPI(token);
                    setMajors(data);
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                toast.error("Không thể kết nối đến server!");
                throw new Error("Can't connect to the server!");
            }
        };
        fetchData();
    }, []);

    let typesData = [
        {
            _id: "66082050bf95182f67b4317c",
            name: "Sư phạm"
        },
        {
            _id: "6608209bbf95182f67b4317d",
            name: "Ngoài sư phạm"
        }
    ]

    const navigate = useNavigate();
    const [majorId, setMajorId] = useState("");
    const [majorName, setMajorName] = useState("");
    const [majorType, setMajorType] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [types, setTypes] = useState(typesData);
    const majorIdRef = useRef(null);

    const handleAddMajor = async () => {
        if (
            majorId && 
            majorName && 
            majorType != "default" &&
            majorType != "") {
            try {
                const newMajor = {
                    majorId: majorId,
                    name: majorName,
                    type: majorType,
                };

                const createdMajor = await createNewMajorAPI(newMajor, token);
                setMajors([...majors, createdMajor]);
                cancelActivity();
                toast.success("Thêm khoa thành công");
            } catch (error) {
                toast.error(majorErrorClassify(error), {
                    position: "top-center",
                    theme: "colored",
                });
            }
        } else {
            toast.error("Vui lòng không bỏ trống thông tin", {
                position: "top-center",
                theme: "colored",
            });
            majorIdRef.current.focus();
        }
    };

    const handleEditMajor = (index) => {
        setIsEdit(true);
        indexToEdit = index;
        setMajorId(majors[index].majorId);
        setMajorName(majors[index].name);
        setMajorType(majors[index].type);
    };

    const confirmEdit = async () => {
        if (majorId && majorName && majorType) {
            majors[indexToEdit].majorId = majorId;
            majors[indexToEdit].name = majorName;
            majors[indexToEdit].type = majorType;

            try {
                await editMajorAPI(majors[indexToEdit]);
                toast.success("Cập nhật khoa thành công");
                cancelActivity();
            } catch (error) {
                toast.error(majorErrorClassify(error), {
                    position: "top-center",
                    theme: "colored",
                });
                throw Error(error);
            }
        } else {
            toast.error("Vui lòng không bỏ trống thông tin", {
                position: "top-center",
                theme: "colored",
            });
            majorIdRef.current.focus();
        }
    };

    const handleDeleteMajor = async (index) => {
        try {
            const majorsToEdit = [...majors];
            await deleteMajorAPI(majorsToEdit[index]);
            majorsToEdit.splice(index, 1);
            setMajors(majorsToEdit);
            toast.success("Xóa thành công", {
                position: "top-left",
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    const cancelActivity = () => {
        setMajorId("");
        setMajorName("");
        setMajorType("");
        setIsEdit(false);
        indexToEdit = -1;
    };

    return (
        <div className="col-12 col-sm-10 col-md-8 m-auto">
            <Navbar user={userData} />

            <div className="control-container my-3 d-flex flex-wrap gap-2">
                <div className="control-item">
                    <label
                        htmlFor="majorId"
                        className="form-label"
                    >
                        Mã khoa
                    </label>
                    <input
                        ref={majorIdRef}
                        value={majorId}
                        onChange={(e) => {
                            setMajorId(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        id="majorId"
                    />
                </div>
                <div className="control-item">
                    <label
                        htmlFor="majorName"
                        className="form-label"
                    >
                        Tên khoa
                    </label>
                    <input
                        value={majorName}
                        onChange={(e) => {
                            setMajorName(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        id="majorName"
                    />
                </div>
                <div className="control-item">
                    <label
                        htmlFor="majorType"
                        className="form-label"
                    >
                        Nhóm ngành
                    </label>
                    <select
                        value={majorType}
                        className="form-select"
                        id="majorType"
                        defaultValue={"default"}
                        onChange={(e) => setMajorType(e.target.value)}
                    >
                        <option value="default">Chọn nhóm ngành</option>
                        {types.map((m) => (
                            <option
                                key={m._id}
                                value={m._id}
                            >
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="control-item"></div>
                <div className="control-item d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            isEdit ? confirmEdit() : handleAddMajor()
                        }
                    >
                        {!isEdit ? "Thêm khoa mới" : "Cập nhật khoa"}
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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã khoa</th>
                            <th scope="col">Tên khoa</th>
                            <th scope="col">Nhóm ngành</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {majors.map((c, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{c.majorId}</td>
                                <td>{c.name}</td>
                                <td>{types.find((m) => m._id == c.type)?.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditMajor(index)}
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeleteMajor(index)
                                        }
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

export default MajorManage;
