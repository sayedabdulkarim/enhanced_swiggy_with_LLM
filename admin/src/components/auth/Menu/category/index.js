import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "./CategoryModal";
import {
  setMenuCategory,
  setMenuCategoryModal,
  setNewMenuItems,
} from "../../../../slices/menuSlice";

import { useAddCategoryToRestaurantMutation } from "../../../../apiSlices/menuApiSlice";
import { handleShowAlert } from "../../../../utils/commonHelper";

const Index = () => {
  //misc
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { categoryModal, restaurantMenuDetails } = useSelector(
    (state) => state.menuReducer
  );
  const { restaurantDetails } = useSelector((state) => state.restaurantReducer);

  //queries n mutation
  const [
    addCategoryToRestaurant,
    {
      isLoading: addCategoryToRestaurantLoading,
      error: addCategoryToRestaurantError,
    },
  ] = useAddCategoryToRestaurantMutation();

  // State for category list - This should ideally come from your API/backend
  const [categoryList, setCategoryList] = useState([]);

  // Handler for adding a new category - This should make an API call to save the category
  const handleAddCategory = async (categoryName) => {
    console.log("Adding new category:", categoryName);
    // Here you would typically make an API call to your backend to add the new category
    // For demonstration, we're just adding it to the local state
    setCategoryList((prev) => [...prev, categoryName]);
    dispatch(setMenuCategory(categoryName));

    try {
      const res = await addCategoryToRestaurant({
        restaurantId: restaurantDetails?._id, // This should be a string
        categoryName: categoryName,
      }).unwrap();

      console.log(res, " resss");
      dispatch(setNewMenuItems(res?.menu));
      handleShowAlert(dispatch, "success", res?.message);
      // dispatch(setCredentials({ ...res }));
      navigate("/addmenu");
    } catch (err) {
      handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }

    // navigate("/addmenu");
    // dispatch(setMenuCategoryModal(false));
  };

  // Handler for selecting an existing category - This might be used to filter items or similar
  const handleSelectCategory = (selectedCategory) => {
    console.log("Selected category:", selectedCategory);
    dispatch(setMenuCategory(selectedCategory));
    navigate("/addmenu");

    // Perform actions based on the selected category
    // setModalVisible(false); // Close the modal after selection
    // dispatch(setMenuCategoryModal(false));
  };

  // Helper function to extract category names
  const extractCategoryNames = (categories) => {
    if (!categories || categories.length === 0) {
      return [];
    }

    return categories.map((category) => category.categoryName);
  };

  useEffect(() => {
    if (restaurantMenuDetails?.restaurantMenu?.menu) {
      const categories = extractCategoryNames(
        restaurantMenuDetails?.restaurantMenu?.menu
      );
      setCategoryList(categories);
    }
  }, [restaurantMenuDetails]);

  useEffect(() => {
    return () => {
      dispatch(setMenuCategoryModal(false));
    };
  }, []);

  return (
    <div>
      {/* <button onClick={openModal}>Add or Select Category</button> */}
      <CategoryModal
        visible={categoryModal}
        onAddCategory={handleAddCategory}
        onSelectCategory={handleSelectCategory}
        categories={categoryList}
        // onClose={() => setModalVisible(false)}
        onClose={() => dispatch(setMenuCategoryModal(false))}
      />
    </div>
  );
};

export default Index;
