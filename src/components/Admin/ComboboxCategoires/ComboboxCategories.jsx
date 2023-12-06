import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
import { createAxios } from "../../../createInstance";
const ComboboxCategories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  let user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  console.log(categories);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userObject = { ...user };
        const axiosJWT = createAxios(userObject);
        const response = await axiosJWT.get(
          `http://localhost:3000/api/v1/categories/combobox`,
          {
            headers: {
              token: userObject?.accessToken,
            },
            withCredentials: true,
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <Select style={{ width: 200 }} onChange={handleChange}>
      {categories.map((category) => (
        <Option key={category._id} value={category._id}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};

export default ComboboxCategories;
