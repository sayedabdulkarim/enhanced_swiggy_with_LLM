import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Switch,
  Button,
  Spin,
  message,
} from "antd";
import ImageUploadInput from "../../utils/FormComponent/ImageUploadInput";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemToCategoryMutation } from "../../apiSlices/menuApiSlice";
import { handleShowAlert } from "../../utils/commonHelper";
import { useGenerateMenuDescriptionMutation } from "../../apiSlices/llmApiSlice";

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

  // Add the generate description mutation hook
  const [generateMenuDescription, { isLoading: isGeneratingDescription }] =
    useGenerateMenuDescriptionMutation();

  //state
  const [form] = Form.useForm();
  const [testInProgress, setTestInProgress] = useState(false);

  function findCategoryId(categories, name) {
    for (let category of categories) {
      if (category.categoryName.toLowerCase() === name.toLowerCase()) {
        return category._id;
      }
    }
    return null;
  }

  const onFinish = async (values) => {
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
        restaurantId: restaurantMenuDetails?.restaurantMenu?._id,
        categoryId,
        data: payload,
      }).unwrap();

      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
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

  const handleGenerateDescription = async () => {
    const features = form.getFieldValue("features");
    if (!features) {
      message.warning("Please enter some features or keywords first");
      return;
    }
    setTestInProgress(true);
    try {
      const result = await generateMenuDescription({ features }).unwrap();
      if (result && result.description) {
        form.setFieldsValue({ description: result.description });
        message.success("Description generated successfully!");
      }
    } catch (error) {
      console.error("Failed to generate description:", error);
      handleShowAlert(dispatch, "error", "Failed to generate description");
    } finally {
      setTestInProgress(false);
    }
  };

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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isVeg: false,
          inStock: false,
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
              name="imageUpload"
              valuePropName="value"
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <ImageUploadInput />
            </Form.Item>
          </Col>
        </Row>
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
              type="primary"
              onClick={handleGenerateDescription}
              style={{ marginTop: "32px" }}
              loading={isGeneratingDescription}
              disabled={isGeneratingDescription}
            >
              Generate Description
            </Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit_btn"
            loading={addItemToCategoryLoading}
          >
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMenu;
