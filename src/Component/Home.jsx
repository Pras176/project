import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../Common/InputFeild";
import DateField from "../Common/DatePicker";
import SelectField from "../Common/Select";
import { Studies } from "../assets/constant";
import { useFormik } from "formik";
import { Editor } from "react-draft-wysiwyg";
import { schema } from "../Common/Schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

export default function Home() {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [description, setDescription] = useState();
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const navigate = useNavigate();
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
      console.log("fr", values);
      const data = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        DOB: values.DOB,
        Study: values.Study,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        CurrentSalary: values?.CurrentSalary,
        Description: description,
      };
      console.log("fr", data);
      toast.success("Registerd successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      axios.post("http://localhost:8000/posts", data).then(() => {
        navigate("/");
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
    {
      name == "Description" && formik.setFieldValue("Description", value);
    }
  };
  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const parsedData = JSON.parse(content);

    // Access the text property from the blocks array
    const textValue = parsedData.blocks.map((block) => block.text).join("");
    setDescription(textValue);
  };
  console.log("date2", formik.values.DOB);
  return (
    <>
      <div className="home-background">
        <h1 className="home-heading">Employee Registration Form</h1>
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
                  className="border rounded-lg shadow-md w-full h-10 px-8 "
                  name="Study"
                  formik={formik}
                  label="Study"
                >
                  {Studies.map((data, index) => {
                    return (
                      <>
                        <option value={data.value}>{data.text}</option>
                      </>
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
                    setDescription();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}
