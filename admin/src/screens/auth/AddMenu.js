import React, { useEffect } from "react";
import { Form, Row, Col, Input, InputNumber, Switch, Button } from "antd";
import ImageUploadInput from "../../utils/FormComponent/ImageUploadInput";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemToCategoryMutation } from "../../apiSlices/menuApiSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const AddMenu = () => {
  //misc
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { categoryName, restaurantMenuDetails } = useSelector(
    (state) => state.menuReducer
  );
  const { restaurantDetails } = useSelector((state) => state.restaurantReducer);
  //queries n mutation
  const [
    addItemToCategory,
    { isLoading: addItemToCategoryLoading, error: addItemToCategoryError },
  ] = useAddItemToCategoryMutation();
  //state
  const [form] = Form.useForm();

  function findCategoryId(categories, name) {
    for (let category of categories) {
      if (category.categoryName.toLowerCase() === name.toLowerCase()) {
        return category._id;
      }
    }
    return null;
  }

  const onFinish = async (values) => {
    // console.log(values);
    const { name, isVeg, inStock, price, description, imageUpload } = values;
    const categoryId = findCategoryId(
      restaurantMenuDetails?.restaurantMenu?.menu,
      categoryName
    );

    const payload = {
      name,
      description,
      imageId: imageUpload,
      inStock,
      price,
    };

    console.log({ payload, categoryId }, " payoaddd");

    try {
      const res = await addItemToCategory({
        // restaurantId: restaurantDetails?._id, // This should be a string
        restaurantId: restaurantMenuDetails?.restaurantMenu?._id, // This should be a string
        categoryId,
        data: payload,
      }).unwrap();

      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
      // dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  useEffect(() => {
    if (!categoryName) {
      navigate("/");
    }
  }, [categoryName, navigate]);

  return (
    <div className="menu_form_container">
      <h3
        onClick={() =>
          console.log(
            { categoryName, restaurantMenuDetails, restaurantDetails },
            " categoryName"
          )
        }
        className="title"
      >
        <span>Selected Category</span> : {categoryName}
      </h3>
      {/*  */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isVeg: false, // Default value for isVeg
          inStock: false, // Default value for inStock
        }}
      >
        <div className="form_item">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input the item name" },
                ]}
              >
                <Input placeholder="Item Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="isVeg" label="Veg" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="inStock"
                label="In Stock"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input the price" }]}
              >
                <InputNumber
                  min={0}
                  placeholder="Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* Row 2: Description */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Description" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Item Image"
              name="imageUpload" // Make sure this matches your form model
              valuePropName="value"
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <ImageUploadInput />
            </Form.Item>
          </Col>
        </Row>

        {/*New Row for Features/Keywords and Generate Description */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="features"
              label="Enter Features/Keywords"
              rules={[
                {
                  required: true,
                  message: "Please input features or keywords",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter features or keywords"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button
              type="default"
              onClick={() => {
                // Add logic to generate description based on features/keywords
                const features = form.getFieldValue("features");
                if (features) {
                  const generatedDescription = `${features}`;
                  form.setFieldsValue({ description: generatedDescription });
                }
              }}
              style={{ marginTop: "32px" }} // Align with the input field
            >
              Generate Description
            </Button>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit_btn">
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMenu;
