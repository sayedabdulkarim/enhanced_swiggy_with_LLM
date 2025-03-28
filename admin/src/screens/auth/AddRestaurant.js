import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Rate,
  TimePicker,
  Select,
} from "antd";
import CuisineTagsInput from "../../utils/FormComponent/TagInput";
import ImageUploadInput from "../../utils/FormComponent/ImageUploadInput";
import { useAddRestaurantMutation } from "../../apiSlices/restaurantApiSlice";
import { handleShowAlert } from "../../utils/commonHelper";

const RestaurantForm = ({ onSave }) => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { Option } = Select;
  const format = "HH:mm"; // 24-hour format
  //state
  const [imageBase64, setImageBase64] = useState("");

  //queries n mutation
  const [
    addRestaurant,
    { isLoading: addRestaurantLoading, error: addRestaurantError },
  ] = useAddRestaurantMutation();

  //func
  const onFinish = async (values) => {
    // Format startTime and nextCloseTime using the 'HH:mm' format
    const {
      name,
      areaName,
      avgRating,
      costForTwo,
      deliveryTime,
      lastMileTravel,
      serviceability,
      iconType,
      startTime,
      nextCloseTime,
      isOpen,
      isVeg,
      discountHeader,
      discountSubHeader,
      cuisines,
      badges,
      imageUpload,
    } = values;

    // console.log(values, " vvv");
    const formattedValues = {
      aggregatedDiscountInfo: {
        header: discountHeader,
        subHeader: discountSubHeader,
      },
      areaName,
      availability: {
        startTime: startTime ? startTime.format("HH:mm") : undefined,
        nextCloseTime: nextCloseTime
          ? nextCloseTime.format("HH:mm")
          : undefined,
        isOpen: isOpen,
      },
      avgRating,
      avgRatingString: avgRating,
      badges,
      cloudinaryImageId: imageUpload,
      costForTwo,
      cuisines,
      isOpen,
      name,
      sla: {
        deliveryTime, //
        lastMileTravel, //
        serviceability, //
        slaString: `${deliveryTime} mins`, //
        lastMileTravelString: `${lastMileTravel} km`,
        iconType,
      },
      type: isVeg ? "veg" : "non-veg",
      veg: isVeg,
    };

    console.log("Formatted values for submission:", {
      formattedValues,
      // values,
    });
    // onSave(formattedValues);
    try {
      const res = await addRestaurant(formattedValues).unwrap();
      console.log(res, " resss");
      handleShowAlert(dispatch, "success", res?.message);
      // dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }
  };

  return (
    <div className="add_restaurant_container">
      <h1 className="title">Add Restaurant</h1>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* basic Info  */}
        <div className="form_item">
          <h3 className="section_title">Basic Info</h3>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="name"
                label="Restaurant Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the restaurant name!",
                  },
                ]}
              >
                <Input placeholder="Restaurant Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="areaName"
                label="Area Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the area name!",
                  },
                ]}
              >
                <Input placeholder="Area Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="avgRating"
                label="Average Rating"
                rules={[
                  {
                    required: true,
                    message: "Please give an average rating!",
                  },
                ]}
              >
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="costForTwo"
                label="Cost for Two"
                rules={[
                  {
                    required: true,
                    message: "Please input the cost for two people!",
                  },
                ]}
              >
                <Input type="number" placeholder="Cost for Two" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* SLA */}
        <div className="form_item">
          <h3 className="section_title">Service Level Agreement ( SLA )</h3>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="deliveryTime"
                label="Delivery Time (mins)"
                rules={[
                  {
                    required: true,
                    message: "Please enter estimated delivery time",
                  },
                ]}
              >
                <Input type="number" placeholder="e.g., 30" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="lastMileTravel"
                label="Last Mile Travel (km)"
                rules={[
                  {
                    required: true,
                    message: "Please enter last mile travel distance",
                  },
                ]}
              >
                <Input type="number" placeholder="e.g., 5" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="serviceability"
                label="Serviceability"
                rules={[
                  { required: true, message: "Please select serviceability" },
                ]}
              >
                <Select placeholder="Select serviceability">
                  <Option value="SERVICEABLE">Serviceable</Option>
                  <Option value="NOT_SERVICEABLE">Not Serviceable</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="iconType"
                label="Icon Type"
                rules={[
                  { required: true, message: "Please select an icon type" },
                ]}
              >
                <Select placeholder="Select Icon Type">
                  <Option value="ICON_TYPE_EMPTY">None</Option>
                  <Option value="ICON_TYPE_STANDARD">Standard</Option>
                  <Option value="ICON_TYPE_EXPRESS">Express</Option>
                  {/* Add more icon types as needed */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Avaibility */}
        <div className="form_item">
          <h3 className="section_title">Availability</h3>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="startTime"
                label="Start Time"
                rules={[
                  {
                    required: true,
                    message: "Please select a start time!",
                  },
                ]}
              >
                <TimePicker format={format} placeholder="Select Start Time" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="nextCloseTime"
                label="Next Close Time"
                rules={[
                  {
                    required: true,
                    message: "Please select the next close time!",
                  },
                ]}
              >
                <TimePicker
                  format={format}
                  placeholder="Select Next Close Time"
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="isOpen" valuePropName="checked" label="Open">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="isVeg"
                valuePropName="checked"
                label="Vegetarian"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="badges" valuePropName="checked" label="Badge">
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Discoutn */}
        <div className="form_item">
          <h3 className="section_title">Discount Information</h3>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="discountHeader"
                label="Header"
                rules={[{ required: true, message: "Header is required" }]}
              >
                <Input maxLength={10} placeholder="Enter header e.g 20% OFF" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="discountSubHeader"
                label="Subheader"
                rules={[{ required: true, message: "Subheader is required" }]}
              >
                <Input
                  maxLength={10}
                  placeholder="Enter subheader e.g UPTO ₹120"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Image */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Restaurant Image"
              name="imageUpload" // Make sure this matches your form model
              valuePropName="value"
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <ImageUploadInput />
            </Form.Item>
          </Col>
        </Row>

        {/* Cuisines */}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="cuisines"
              label="Cuisines"
              rules={[
                {
                  required: true,
                  type: "array",
                  min: 1,
                  message: "Please add at least one cuisine!",
                },
              ]}
            >
              <CuisineTagsInput />
            </Form.Item>
          </Col>
        </Row>
        {/* ...add more rows and cols for all fields... */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit_button">
            Save Restaurant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RestaurantForm;
