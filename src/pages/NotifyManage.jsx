import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
  fetchNotifiesAPI,
  createNewNotifyAPI,
  editNotifyAPI,
  deleteNotifyAPI,
  fetchMajorsAPI,
} from "../apis";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { modalStyles } from "../utils/constants";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw } from 'draft-js';

function NotifyManage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [notifies, setNotifies] = useState([]);
  const [current, setCurrent] = useState({
    title: "",
    content: "",
    authorId: "",
  });
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user-token"));
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState();

  const removeState = () => {
    setEditorState(EditorState.createEmpty());
    setCurrent({
      ...current,
      title: "",
      content: ""
    })
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCreateClick = () => {
    openModal();
    setStatus("Thêm mới");
  };

  const handleInputChange = (e) => {
    setCurrent({
      ...current,
      [e.target.name]: e.target.value,
    });
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setCurrent({
      ...current,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  const handleSaveBtnClick = async () => {
    current.authorId = userData._id;
    console.log(current);
    try {
      if (status === "Thêm mới") {
        const newNotify = await createNewNotifyAPI(current, token);
        setNotifies([...notifies, newNotify]);
        toast.success("Thêm môn học thành công");
      }
      closeModal();
      removeState();
    } catch (error) {
      toast.error("Thông tin không hợp lệ!")
      console.error(error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        if (userData?.role === "admin") {
          const notifies = await fetchNotifiesAPI(token);
          setNotifies(notifies);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Không thể kết nối đến server");
      }
    };

    if (userData) {
      fetchData();
    }
  }, [userData]);

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", 'Client-ID "ec6bb9fbdb21e25"');
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />
      <h3 className="mt-3">Quản lý thông báo</h3>
      <div className="my-3">
        <button className="btn btn-primary" onClick={handleCreateClick}>
          Tạo thông báo mới
        </button>
      </div>

      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Nội dung thông báo</th>
              <th scope="col">tác giả</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {notifies.map((n, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{n?.title}</td>
                <td>{n?.content}</td>
                <td>{n?.authorId}</td>
                <td>
                  <button
                    onClick={() => { handleEditBtnClick(n?._id) }}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => { handleDeleteBtnClick(n?._id) }}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        style={modalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel=""
      >
        <div className="modal-header">
          <h4 className="modal-title">{status} thông báo</h4>
        </div>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Tiêu đề thông báo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={current?.title}
          />
        </div>
        <div className="mb-2" style={{ height: "75%" }}>
          <label htmlFor="content" className="form-label">
            Nội dung thông báo
          </label>
          <Editor
            id="content"
            wrapperClassName="mb-3 editor-wrapper"
            editorClassName="mt-3 form-control notify-editor"
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: false },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: true },
              },
            }}
          />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-danger px-5" onClick={closeModal}>Hủy</button>
          <button className="btn btn-primary px-5" onClick={handleSaveBtnClick}>Lưu</button>
        </div>
      </Modal>
    </div>
  );
}

export default NotifyManage;
