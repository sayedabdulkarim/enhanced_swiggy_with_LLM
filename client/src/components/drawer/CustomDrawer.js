import React from "react";
import { Drawer } from "antd";

const CustomDrawerComponent = ({
  title,
  open,
  onClose,
  placement,
  width,
  children,
  className,
}) => {
  return (
    <Drawer
      title={title ?? ""}
      placement={placement}
      onClose={onClose}
      open={open}
      width={width}
      className={className}
    >
      {children}
    </Drawer>
  );
};

// export { CustomDrawerComponent };
export default CustomDrawerComponent;
