import React from "react";
import { useState, useEffect } from "react";
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiOutlineEye} from 'react-icons/ai';
import {MdDeleteOutline} from 'react-icons/md';
import {FiEdit2} from 'react-icons/fi'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Update from './Update';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const View = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/posts/${id}`).then(() => {
      getData();
      toast.success("Deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  function getData() {
    axios.get("http://localhost:8000/posts").then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }
  return (
    <div>
      <style></style>
      <>
        <div class="">
          <h1 className="home-secondheading">Employee List</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>

                  <th>DOB</th>

                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              {data.map((eachdata) => {
                return (
                  <>
                    <tbody className=" w-full flex items-center justify-center">
                      <tr>
                        <td>
                          {eachdata.FirstName} {eachdata.LastName}
                        </td>

                        <td>{eachdata.DOB}</td>

                        <td>{eachdata.StartDate}</td>
                        <td>{eachdata.EndDate}</td>
                        <td>{eachdata.Description}</td>
                        <div style={{ position: "relative" }}>
                          <td onClick={openModal} className="reacticon"><BsThreeDotsVertical /></td>
                          {isModalOpen && (
                            <div
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                background: "#fff",
                                boxAShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                zIndex: "1", // Ensure it's above the table
                                padding: "10px",
                              }}
                            >
                             <button
                                style={{
                                  backgroundColor: "white",
                                  color: " black",
                                }}
                                type="button"
                                onClick={closeModal}
                              >
                               <AiOutlineEye/> View
                              </button>
                              <div
                                style={{
                                  borderBottom: "2px solid black",
                                  width: "100%",
                                }}
                              ></div>
                              <button
                                style={{
                                  backgroundColor: "white",
                                  color: " black",
                                }}
                                type="button"
                                onClick={() => handleDelete(eachdata.id)}
                              >
                               <MdDeleteOutline/> Delete
                              </button>
                              <div
                                style={{
                                  borderBottom: "2px solid black",
                                  width: "100%",
                                }}
                              ></div>
                              
                              <button
                                style={{
                                  backgroundColor: "white",
                                  color: " black",
                                }}
                                type="button"
                                onClick={() => navigate(`/edit/${eachdata.id}`)}
                              >
                               <FiEdit2/> Edit
                              </button>
                            </div>
                            
                          )}
                          {/* Rest of your table */}
                        </div>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </>
    </div>
  );
};

export default View;
