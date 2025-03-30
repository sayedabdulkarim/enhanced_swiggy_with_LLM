import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { useSelector } from "react-redux";

const CategoryModal = ({
  visible,
  onAddCategory,
  onSelectCategory,
  categories,
  onClose,
}) => {
  const { categoryModal, restaurantMenuDetails } = useSelector(
    (state) => state.menuReducer
  );
  //
  const [form] = Form.useForm();
  const [isNewCategory, setIsNewCategory] = useState(true);

  const handleSubmit = (values) => {
    if (isNewCategory) {
      onAddCategory(values.newCategory);
    } else {
      onSelectCategory(values.existingCategory);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  //

  useEffect(() => {
    form.resetFields();
  }, [visible, form]);

  return (
    <Modal
      title="Add or Select Category"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="categoryType" initialValue="new">
          <Select onChange={(value) => setIsNewCategory(value === "new")}>
            <Select.Option value="new">Add New Category</Select.Option>
            <Select.Option value="existing">
              Select Existing Category
            </Select.Option>
          </Select>
        </Form.Item>
        {isNewCategory ? (
          <Form.Item
            name="newCategory"
            rules={[
              {
                required: true,
                message: "Please input the new category name!",
              },
            ]}
          >
            <Input placeholder="New Category Name" />
          </Form.Item>
        ) : (
          <Form.Item
            name="existingCategory"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CategoryModal;
