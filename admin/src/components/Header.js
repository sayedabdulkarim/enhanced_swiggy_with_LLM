import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavbarLogo } from "../utils/svgs";
import { logOutUser } from "../slices/authSlice";
import { useLogoutMutation } from "../apiSlices/userApiSlice";

const { Header } = Layout;

const AppHeader = () => {
  //misc
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //apis
  const [logOut] = useLogoutMutation();
  //func
  const handleLogout = async (e) => {
    try {
      const res = await logOut().unwrap();
      console.log(res, "res, from logoutttt");
      dispatch(logOutUser());
      navigate("/auth");
    } catch (error) {
      console.log(error, " errrrrrrr");
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const content = (
    <Menu>
      <Menu.Item key="logout" onClick={() => handleLogout()}>
        Logout
      </Menu.Item>
      <Menu.Item key="dashboard" onClick={() => handleDashboard()}>
        Dashboard
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout className="nav_container">
      <Header className="custom_header">
        <Link to={"/"} className="logo">
          <NavbarLogo />
        </Link>
        {/* Profile Icon */}
        <Popover content={content} trigger="hover">
          <Avatar size="large" icon={<UserOutlined />} />
        </Popover>
      </Header>
    </Layout>
  );
};

export default AppHeader;
