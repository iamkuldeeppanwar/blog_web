import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Menu } from "@mui/material";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Profilepic from "../Profilepic/Profilepic";
import "./Header.css";

function Header() {
  const Navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const Auth = localStorage.getItem("Authorization");

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);

  const Logout = () => {
    const confirmBox = window.confirm("Do you really want to Logout?");
    if (confirmBox === true) {
      Navigate("/logout");
    }
  };
  const Myprofile = () => {
    Navigate("/myprofile");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      {/* Login modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader isClose={modal} toggle={toggle}>
          LOGIN
        </ModalHeader>
        <ModalBody>
          <Login />
        </ModalBody>
      </Modal>
      {/* Signup modal */}
      <Modal isOpen={modal1} toggle={toggle1}>
        <ModalHeader isClose={modal1} toggle={toggle1}>
          SIGNUP
        </ModalHeader>
        <ModalBody>
          <Signup />
        </ModalBody>
      </Modal>

      {/* Appbar */}
      <AppBar position="static" color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              BLOGPOST
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              BlOGPOST
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            {Auth ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ width: 70, height: 70 }} alt="Remy Sharp">
                        <Profilepic />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Button onClick={Myprofile}>My profile</Button>
                    <br />
                    <Button onClick={Logout}>Logout</Button>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <div className="lgn-snp">
                  <div>
                    <Button onClick={toggle}>Login</Button>
                  </div>
                  <div>
                    {" "}
                    <Button onClick={toggle1}>Signup</Button>
                  </div>
                </div>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
