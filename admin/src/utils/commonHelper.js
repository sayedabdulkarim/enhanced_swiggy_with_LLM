import { setAlert, resetAlert } from "../slices/alertSlice";
//for setting attribute in the body,for customising ui as per the selected theme
const toggleTheme = (color) => {
  document.querySelector("body").setAttribute("data-theme", color);
};

const handleShowAlert = (dispatch, type, content, timeout = 2000) => {
  dispatch(setAlert({ type, content }));
  setTimeout(() => {
    dispatch(resetAlert());
  }, timeout);
};

const scrollTo = (params) => {
  const { element, to, duration, scrollDirection } = params;

  var start = element[scrollDirection];
  var change = to - start;
  var increment = 1000 / 60;

  var anmiateScroll = (elapsedTime) => {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);
    element[scrollDirection] = position;

    if (elapsedTime < duration) {
      window.requestAnimationFrame(anmiateScroll.bind(null, elapsedTime));
    }
  };

  window.requestAnimationFrame(anmiateScroll.bind(null, 0));
};

const easeInOut = (currentTime, start, change, duration) => {
  currentTime /= duration / 2;

  if (currentTime < 1) {
    return (change / 2) * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
};

const arrayToString = (arr) => {
  if (arr.length === 0) {
    return "";
  }
  if (arr.length === 1) {
    return arr[0];
  }
  // Join all elements except the last with a comma and a space
  const firstPart = arr.slice(0, -1).join(", ");
  // Add the last element with 'and' before it
  const lastPart = arr[arr.length - 1];
  return firstPart + " and " + lastPart;
};

const hasActiveFilters = (filterOption) => {
  return (
    filterOption.sort !== "" ||
    filterOption.deliveryTime.length > 0 ||
    filterOption.cuisines.length > 0 ||
    filterOption.explore.length > 0 ||
    filterOption.rating.length > 0 ||
    filterOption.vegNonVeg !== null ||
    filterOption.costForTwo.length > 0 ||
    filterOption.offers !== null
  );
};

const initialFilterOption = {
  sort: "",
  deliveryTime: [],
  cuisines: [],
  explore: [],
  rating: [],
  vegNonVeg: null,
  costForTwo: [],
  offers: null,
};

const getCountByProductIdFromCart = (items, productId) => {
  // Find the item by id
  const item = items.find((item) => item._id === productId);

  // Return the count if the item is found, otherwise return 0
  return item ? item.count : 0;
};

const formatUTCToLocal = (utcTimestamp) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(utcTimestamp);
  return date.toLocaleString("en-US", options);
};

const getRestaurantById = (arr, id) => {
  return arr.find((o) => o?._id === id);
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.count, 0);
};

const filterObjectsByIds = (objects, ids) => {
  return objects.filter((obj) => ids.includes(obj._id));
};

const areAllItemsEmpty = (arr) => {
  console.log(arr, " arrr");
  return arr.every((category) => category.items.length === 0);
};

export {
  toggleTheme,
  handleShowAlert,
  scrollTo,
  arrayToString,
  hasActiveFilters,
  initialFilterOption,
  getCountByProductIdFromCart,
  formatUTCToLocal,
  getRestaurantById,
  calculateTotalPrice,
  filterObjectsByIds,
  areAllItemsEmpty,
};
