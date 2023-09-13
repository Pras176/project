// Edit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../Common/InputFeild";
import DateField from "../Common/DatePicker";
import SelectField from "../Common/Select";
import { Studies } from "../assets/constant";
import { useFormik } from "formik";
import { schema } from "../Common/Schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

export default function Edit() {
  const { id } = useParams(); // Get the ID from the route params
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [description, setDescription] = useState("");
  const [existingData, setExistingData] = useState({})

  // Add an effect to fetch the existing data based on the ID
  useEffect(() => {
    // Fetch data based on the ID and set it in the form
    axios.get(`http://localhost:8000/posts/${id}`).then((res) => {
      const fetchedData = res.data;
      setExistingData(fetchedData);

      // Set fetchedData into the form fields
      formik.setFieldValue("FirstName", fetchedData.FirstName);
      formik.setFieldValue("LastName", fetchedData.LastName);
      formik.setFieldValue("DOB", fetchedData.DOB);
      formik.setFieldValue("Study", fetchedData.Study);
      formik.setFieldValue("StartDate", fetchedData.StartDate);
      formik.setFieldValue("EndDate", fetchedData.EndDate);
      formik.setFieldValue("CurrentSalary", fetchedData.CurrentSalary);

      // Set existingData into the editorState and description state
      const contentState = convertFromRaw(JSON.parse(fetchedData.Description));
      setEditorState(EditorState.createWithContent(contentState));
      setDescription(
        contentState.getPlainText() // Set description to plain text
      );
    });
  }, [id]);

useEffect(()=>{
setDescription(existingData.Description)
},[existingData])
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      DOB: "",
      Study: "",
      StartDate: "",
      EndDate: "",
      CurrentSalary: "",
      Description: "",
    },

    onSubmit: (values) => {
      // Handle the form submission for editing
      // Update the data on the server with the new values
      axios.put(`http://localhost:8000/posts/${id}`, values).then(() => {
        toast.success("Edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/"); // Navigate back to the view page
      });
    },
    validationSchema: schema,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "DOB" && formik.setFieldValue("DOB", value);
    }
   
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const parsedData = JSON.parse(content);

    // Access the text property from the blocks array
    const textValue = parsedData.blocks.map((block) => block.text).join("");
    setDescription(textValue ? textValue : existingData.Description);
  };

  return (
    <>
      <div className="home-background">
        <h1 className="home-heading">Employee Editing Form</h1>
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <div className="registration-background">
            <div className="registration-table">
              <div className="one-feild">
                <TextField
                  label="First Name"
                  name="FirstName"
                  isRequiredLabel
                  formik={formik}
                  placeholder="Enter your name"
                />
                <TextField
                  label="Last Name"
                  name="LastName"
                  isRequiredLabel
                  formik={formik}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <DateField
                  label="DOB"
                  name="DOB"
                  type="date"
                  formik={formik}
                  placeholder="Enter your dob"
                />
              </div>
              <div>
                <SelectField
                  className="border rounded-lg shadow-md w-full h-10 px-8"
                  name="Study"
                  formik={formik}
                  label="Study"
                >
                  {Studies.map((data, index) => {
                    return (
                      <option key={index} value={data.value}>
                        {data.text}
                      </option>
                    );
                  })}
                </SelectField>
              </div>
              <div className="one-feild">
                <DateField
                  label="Start Date"
                  name="StartDate"
                  type="date"
                  formik={formik}
                  placeholder="Enter start date"
                />
                <DateField
                  label="End Date"
                  name="EndDate"
                  type="date"
                  placeholder="Enter end date"
                  isRequiredLabel
                  formik={formik}
                />
              </div>
              <div>
                <TextField
                  label="Current Salary"
                  name="CurrentSalary"
                  formik={formik}
                  placeholder="Enter current salary"
                />
              </div>
              <Editor
                editorClassName="rich-text-editor"
                wrapperClassName="wrapper-class"
                toolbarClassName="toolbar-calss"
                handlePastedText={() => true}
                toolbar={{
                  options: ["inline", "list"],
                  inline: {
                    options: ["bold", "italic", "underline"],
                    bold: { className: "inline-class-1" },
                  },
                  list: {
                    options: ["unordered", "ordered"],
                  },
                }}
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                onChange={handleSubmit}
              />
              <div className="button-container">
                <button
                  type="cancel"
                  className="cancel-button"
                  onClick={() => {
                    formik.resetForm();
                    setDescription("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
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
    </>
  );
}
