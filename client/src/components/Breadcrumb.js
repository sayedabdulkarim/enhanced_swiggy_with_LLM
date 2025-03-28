import React from "react";

// Assuming this is your Breadcrumb component
const Breadcrumb = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <span key={index}>
          {item.title}
          {index < items.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

// Helper function to create breadcrumbs
const createBreadcrumb = (breadcrumbItems) => {
  const items = breadcrumbItems.map((item) => {
    return {
      title: item.link ? <a href={item.link}>{item.title}</a> : item.title,
    };
  });

  return <Breadcrumb items={items} />;
};

// Example usage
const App = () => {
  const breadcrumbItems = [
    { title: "Home", link: "/" },
    { title: "Application Center", link: "/app-center" },
    { title: "Application List", link: "/app-list" },
    { title: "An Application" }, // No link provided for the last item
  ];

  return createBreadcrumb(breadcrumbItems);
};

export default App;
