import { Alert, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser, getAllUsers, updateUser } from "../../../redux/apiRequest";
import "./Users.scss";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddNewUser from "./AddNewUser";
// import Cookies from "js-cookie";
const Users = () => {
  // const refreshToken1 = Cookies.get("refreshToken");
  const onSubmit = async (id) => {
    // Handle Edit/Update User
    const updatedFields = {
      name: username,
      email: email,
      phonenumber: phonenumber,
      address: address,
    };
    if (updatedFields) {
      const response = await dispatch(updateUser({ user, id, updatedFields }));
      if (response) {
        notify()
      }else {
        notify1()
      }
    }
  };

  // Redux toolkits
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.messages);
  const token = user?.accessToken;
  localStorage.setItem("token", token);
  // Handle Delete user
  const handleDelete = async (id) => {
    const res = await dispatch(deleteUser({ user, id }));
    if (res) {
      notify3();
    }else {
      notify4();
    }
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    if (user?.accessToken) {
      dispatch(getAllUsers(user));
    }
    deleteUser();
  }, [user, token,]);

  const [RowData, setRowData] = useState([]);
  const [ViewShow, setViewShow] = useState(false);
  const handleViewShow = () => {
    setViewShow(true);
  };
  const handleViewClose = () => {
    setViewShow(false);
  };

  // For Edit Modal
  const [ViewEdit, setEditShow] = useState(false);
  const handleEditShow = () => {
    setEditShow(true);
  };
  const handleEditClose = () => {
    setEditShow(false);
  };

  // Delete Modal
  const [ViewDelete, setDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    setDeleteShow(true);
  };
  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  //Define here local state that store the form data
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);
  const [address, setAddress] = useState(null);

  const [Edit, setEdit] = useState(false);
  const [Delete, setDelete] = useState(false);
  //Id for update record and Delete
  const [ID, setID] = useState(RowData._id);

  //handle Delete Function
  // accessToken, dispatch, id, axiosJWT,history

  // react toastify
  const notify = () => {
    toast.success("Cập nhật thông tin người dùng thành công !", {
      position: toast.POSITION.TOP_RIGHT
    })
  };
  const notify1= () => {
    toast.warn("Cập nhật thông tin người dùng thất bại!", {
      position: toast.POSITION.TOP_RIGHT
    })
  };
  const notify3 = () => {
    toast.success("Xoá tài khoản người dùng thành công !", {
      position: toast.POSITION.TOP_RIGHT
    })
  };
  const notify4= () => {
    toast.warn("Có lỗi xảy ra khi cố gắng xoá tài khoản người dùng!", {
      position: toast.POSITION.TOP_RIGHT
    })
  };
  return (
    <>

      {/* <AddNewUser /> */}
      <div className="user_role">
        {`Your role: ${user?.user.admin ? `Admin` : `User`}`}
      </div>

      {/* <div className="delete_message">{msg}</div> */}

      <div className="row">
        <div className="table-responsive">
          <table className="table table=striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/*optional chaining  "?" */}
              {userList?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.address}</td>
                    <td style={{ minWidth: 190 }}>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          handleViewShow(setRowData(user));
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          handleEditShow(
                            setRowData(user),
                            setID(user._id),
                            setEdit(true)
                          );
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          handleViewShow(
                            setRowData(user),
                            setID(user._id),
                            setDelete(true)
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Modal */}
      <div className="model-box-view">
        <Modal
          show={ViewShow}
          onHide={handleViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View User Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={RowData.name}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control"
                value={RowData.email}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                value={RowData.phonenumber}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                value={RowData.address}
                readOnly
              />
            </div>
            {Delete && (
              <div>
                <Alert show={show} variant="primary">
                  <Alert.Heading>Notification!</Alert.Heading>
                  <p>{msg}</p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => setShow(false)}
                      variant="outline-primary"
                    >
                      Close me y'all!
                    </Button>
                  </div>
                </Alert>

                <Button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={() => {
                    handleDelete(RowData._id);
                    setShow(true);
                  }}
                >
                  Delete User
                </Button>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Modal for Edit User record */}
      <div className="model-box-view">
        <Modal
          show={ViewEdit}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Please enter Username"
                value={username || RowData.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Please enter email"
                value={email || RowData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phonenumber</label>
              <input
                type="text"
                className="form-control"
                placeholder="Please enter PhoneNumber"
                value={phonenumber || RowData.phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Please enter Address"
                value={address || RowData.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {Edit && (
              <div>
                <Button
                  type="submit"
                  className="btn btn-warning mt-4"
                  onClick={() => {
                    setShow(true);
                    onSubmit(RowData._id);
                    // onClick = { notify }
                  }}
                >
                  Edit User
                </Button>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default Users;