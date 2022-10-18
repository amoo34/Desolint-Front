import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
// material
import {
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
// components
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider, Field } from "formik";
import * as Yup from "yup";
// import { SketchPicker } from 'react-color';
// import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// import { setUserAccesssToken, getBusiness } from '../utils/localStorage';
import CircularProgress from "@mui/material/CircularProgress";

export default function CreateCustomer(props) {
  const navigate = useNavigate();
  const [fileImages, setFileImages] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState([]);
  const [loader, setLoader] = useState(false);

  // Form Validation Schema
  const carSchema = Yup.object().shape({
    model: Yup.string().required("Model is required"),
    price: Yup.string().required("Price is required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    copies: Yup.number().required("Number is required"),
    files: Yup.array().of(Yup.object()),
  });

  function deleteFile(e) {
    const s = avatarPreview.filter((item, index) => index !== e);
    const filterFileImages = fileImages.filter((item, index) => index != e);
    setAvatarPreview(s);
    setFileImages(filterFileImages);
    console.log(s);
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    // let reader = new FileReader();
    let file = e.target.files[0];
    const copyFileImage = [...fileImages];
    copyFileImage.push(e.target.files[0]);
    console.log("FILE IMAGES  ", copyFileImage);
    setFileImages(copyFileImage);
    // fileReader.readAsDataURL(e.target.file);
    fileReader.onloadend = () => {
      const copyAvatarPreview = [...avatarPreview];
      copyAvatarPreview.push(fileReader.result);

      setAvatarPreview(copyAvatarPreview);
      // }
    };

    fileReader.readAsDataURL(file);
  };

  const formik = useFormik({
    initialValues: {
      model: "",
      price: "",
      phone: "",
      city: "",
      copies: 3,
      files: [],
    },
    // validationSchema: LoginSchema,
    validationSchema: carSchema,
    onSubmit: async (values) => {
      const { model, price, phone, city, copies } = values;
      try {
        let errorOb = {};

        let formData = new FormData(); //formdata object

        console.log("FILE IAMGES  ", fileImages, JSON.stringify(fileImages));
        const userData = JSON.parse(localStorage.getItem("userData"));
        formData.append("model", model); //append the values with key, value pair
        formData.append("price", price);
        formData.append("phone", phone);
        formData.append("city", city);
        formData.append("copies", copies);
        fileImages.forEach((fileImage) => {
          formData.append("images", fileImage);
        });

        formData.append("userId", userData.id);

        const url = `${process.env.REACT_APP_SERVER_URL}/api/car/add`;

        setLoader(true);

        const data = await axios.post(url, formData, {
          headers: {
            authorization: `Bearer ${userData.token}`,
          },
        });
        console.log("DATA ", data);
        setLoader(false);
        toast.success("Car Added Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        setLoader(false);
        console.log("err message", err.response.data.message);
        toast.error("Car Data not Saved", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  });
  // const handleThemeColor = (color) => {
  //   setThemeColor(color.hex);
  // };

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  return (
    <Container>
      <FormikProvider value={formik} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <Stack spacing={3} mt={5}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={5}
            >
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>

            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              mt={5}
            >
              {loader && (
                <CircularProgress
                  style={{
                    width: "120px",
                    height: "120px",
                    position: "absolute",
                  }}
                />
              )}

              <TextField
                sx={{ m: 1, width: "90ch" }}
                autoComplete="Model"
                type="text"
                // value={props.businessProp.username}
                label="model"
                {...getFieldProps("model")}
                error={Boolean(touched.model && errors.model)}
                helperText={touched.model && errors.model}
              />

              <TextField
                sx={{ m: 0, width: "90ch" }}
                autoComplete="price"
                type="text"
                // value={props.businessProp.email}
                label="price"
                {...getFieldProps("price")}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
              />

              <TextField
                sx={{ m: 1, width: "90ch" }}
                autoComplete="Phone number"
                type="number"
                // value={props.businessProp.username}
                label="Phone Number"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <TextField
                sx={{ m: 1, width: "90ch" }}
                autoComplete="City"
                type="text"
                // value={props.businessProp.username}
                label="city"
                {...getFieldProps("city")}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
              />

              <TextField
                sx={{ m: 1, width: "90ch" }}
                autoComplete="No of Copies"
                type="number"
                // value={props.businessProp.username}
                label="No of copies"
                {...getFieldProps("copies")}
                error={Boolean(touched.copies && errors.copies)}
                helperText={touched.copies && errors.copies}
              />

              <Button variant="contained" component="label">
                Upload File
                <input
                  name="avatar"
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  disabled={values.copies === fileImages.length}
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>

              {avatarPreview.length > 0 &&
                avatarPreview.map((file, index) => {
                  return (
                    <div style={{ display: "flex" }} key={index}>
                      <img
                        src={file}
                        style={{ height: "60px", width: "60px" }}
                      />
                      <button type="button" onClick={() => deleteFile(index)}>
                        delete
                      </button>
                    </div>
                  );
                })}

              {/* )}  */}
              {/* <p>{businessTermsAndCondition}</p> */}

              {/* <div>
                <input type="checkbox" id="agree"
                 onChange={checkboxHandler}
                 />
                <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
              </div> */}
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
    // </Page>
  );
}
