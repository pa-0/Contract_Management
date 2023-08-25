import NextLink from "next/link";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import React from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { TbDiscount, TbBuildingWarehouse, TbShip } from "react-icons/tb";
import { MdOutlineLeaderboard, MdAppRegistration } from "react-icons/md";
import {
  FiClipboard,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiShoppingBag,
  FiAward,
  FiPieChart,
  FiAirplay,
  FiUserCheck,
  FiCreditCard,
  FiTruck,
  FiDatabase,
  FiList,
  FiEdit2,
  FiMessageSquare,
  FiBarChart,
} from "react-icons/fi";
import { IoAccessibilityOutline } from "react-icons/io5";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { RiAdvertisementLine, RiEqualizerLine } from "react-icons/ri";
import { BsChatLeftDots } from "react-icons/bs";
import { CgController } from "react-icons/cg";
import { useSelector } from "react-redux";
import DataStore from "../../../DataStore";
import Image from "next/image";

// const FinalMenuList = [
//   {
//     navlabel: true,
//     subheader: "DASHBOARDS",
//     icon: "mdi mdi-dots-horizontal",
//     href: "dashboard",
//   },
//   {
//     title: "Dashboard 1",
//     icon: <MdOutlineSpaceDashboard />,
//     href: "/dashboard/dashboard1",
//   },
//   {
//     title: "Dashboard 2",
//     icon: <FiPieChart />,
//     href: "/dashboard/dashboard2",
//   },
//   {
//     navlabel: true,
//     subheader: "CONTENT",
//     icon: "mdi mdi-dots-horizontal",
//     href: "content",
//   },
//   {
//     title: "Management",
//     icon: <FiAirplay />,
//     href: "/content/management",
//   },
//   {
//     title: "Control",
//     icon: <CgController />,
//     href: "/content/control",
//   },
//   {
//     title: "Presentation",
//     icon: <HiOutlinePresentationChartBar />,
//     href: "/content/presentation",
//   },
//   // {
//   //   title: "Analytics",
//   //   icon: <TbFileAnalytics />,
//   //   href: "/content/analytics",
//   // },
//   {
//     navlabel: true,
//     subheader: "AI & ML",
//     icon: "mdi mdi-dots-horizontal",
//     href: "content",
//   },
//   {
//     title: "AI Analytics",
//     icon: <FiBarChart />,
//     href: "/analytics/dbanalysis",
//   },
//   {
//     title: "AI ChatBot",
//     icon: <FiMessageSquare />,
//     href: "/analytics/aichat",
//   },
//   {
//     navlabel: true,
//     subheader: "CUSTOMER",
//     icon: "mdi mdi-dots-horizontal",
//     href: "customer",
//   },
//   {
//     title: "Leads",
//     icon: <MdOutlineLeaderboard />,
//     href: "/customer/leads",
//   },
//   {
//     title: "Orders",
//     icon: <FiShoppingBag />,
//     href: "/customer/orders",
//   },
//   {
//     title: "Tickets",
//     icon: <IoTicketOutline />,
//     href: "/customer/tickets",
//   },
//   {
//     title: "Chat",
//     icon: <BsChatLeftDots />,
//     href: "/customer/chat",
//   },
//   {
//     title: "Shipment",
//     icon: <TbShip />,
//     href: "/customer/shipment",
//   },
//   {
//     navlabel: true,
//     subheader: "CONFIG",
//     icon: "mdi mdi-dots-horizontal",
//     href: "configuration",
//   },
//   {
//     title: "Discount",
//     icon: <TbDiscount />,
//     href: "/configuration/discount",
//   },
//   {
//     title: "Employee",
//     icon: <FiUserCheck />,
//     href: "/configuration/employee",
//   },
//   {
//     title: "Customer",
//     icon: <FiUserPlus />,
//     href: "/configuration/customer",
//   },
//   {
//     title: "Address",
//     icon: <FiCreditCard />,
//     href: "/configuration/address",
//   },
//   {
//     title: "Supplier",
//     icon: <FiUsers />,
//     href: "/configuration/supplier",
//   },
//   {
//     title: "Carrier Account",
//     icon: <FiTruck />,
//     href: "/configuration/carrieraccount",
//   },
//   {
//     title: "Product Category",
//     icon: <BiCategoryAlt />,
//     href: "/configuration/productcategory",
//   },
//   {
//     title: "Module Access",
//     icon: <IoAccessibilityOutline />,
//     href: "/configuration/moduleaccess",
//   },
//   {
//     title: "Account",
//     icon: <MdOutlineAccountCircle />,
//     href: "/configuration/account",
//   },
//   {
//     navlabel: true,
//     subheader: "TOOLS",
//     icon: "mdi mdi-dots-horizontal",
//     href: "tools",
//   },
//   {
//     title: "Notes",
//     icon: <CgNotes />,
//     href: "/tools/notes",
//   },
//   {
//     title: "Calendar",
//     icon: <FiCalendar />,
//     href: "/tools/calender",
//   },
//   {
//     title: "Todos",
//     icon: <FiEdit2 />,
//     href: "/tools/todo",
//   },
//   {
//     title: "Whiteboard",
//     icon: <FiClipboard />,
//     href: "/tools/whiteboard",
//   },
//   {
//     title: "Task Assignment",
//     icon: <FaTasks />,
//     href: "/content/taskassignment",
//   },

//   {
//     navlabel: true,
//     subheader: "TENDER",
//     icon: "mdi mdi-dots-horizontal",
//     href: "tender",
//   },
//   {
//     title: "RFP",
//     icon: <CgNotes />,
//     href: "/tender/rfp",
//   },
//   {
//     title: "Advertisement",
//     icon: <RiAdvertisementLine />,
//     href: "/tender/advertisement",
//   },
//   {
//     title: "Evaluation",
//     icon: <RiEqualizerLine />,
//     href: "/tender/evaluation",
//   },
//   {
//     title: "Award",
//     icon: <FiAward />,
//     href: "/tender/award",
//   },
//   // {
//   //   navlabel: true,
//   //   subheader: "PARTNER",
//   //   icon: "mdi mdi-dots-horizontal",
//   //   href: "partner",
//   // },

//   {
//     navlabel: true,
//     subheader: "SUPPLIER",
//     icon: "mdi mdi-dots-horizontal",
//     href: "supplier",
//   },
//   {
//     title: "Tickets",
//     icon: <IoTicketOutline />,
//     href: "/supplier/tickets",
//   },
//   {
//     title: "Chat",
//     icon: <BsChatLeftDots />,
//     href: "/supplier/chat",
//   },
//   {
//     title: "Products",
//     icon: <FiShoppingBag />,
//     href: "/supplier/products",
//   },
//   {
//     title: "My Orders",
//     icon: <FiList />,
//     href: "/supplier/orders",
//   },
//   {
//     title: "Suppiler Registration",
//     icon: <MdAppRegistration />,
//     href: "/supplier/request",
//   },
//   {
//     navlabel: true,
//     subheader: "MISCELLANEOUS",
//     icon: "mdi mdi-dots-horizontal",
//     href: "additional",
//   },
//   {
//     title: "Media Store",
//     icon: <FiDatabase />,
//     href: "/mediastore",
//   },
//   {
//     title: "Warehouse",
//     icon: <TbBuildingWarehouse />,
//     href: "/content/warehouse",
//   },
// ];

function SideNavbar(
  { isMobileSidebarOpen, onSidebarClose, isSidebarOpen },
  props
) {
  let FinalMenuList = useSelector((state) => state.ModuleWrapper.MenuList);

  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathDirect = router.pathname;
  const location = router.pathname;
  const pathWithoutLastPart = router.pathname.slice(
    0,
    router.pathname.lastIndexOf("/")
  );
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  const SidebarContent = (
    <SimpleBar style={{ height: "100%" }}>
      <Box p={2} height="100%">
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={DataStore.KUPEXLOGO} height="80px" width="178px" />
        </Box> */}
        <Box mt={0}>
          <List>
            {FinalMenuList.map((item, index) => {
              //  {/********SubHeader**********/}
              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="500"
                      sx={{ my: 2, mt: 4, opacity: "0.4" }}
                    >
                      {item.subheader}
                    </Typography>
                  </li>
                );
                // {/********If Sub Menu**********/}
                // {/* eslint no-else-return: "off" */}
              } else if (item.children) {
                return (
                  <React.Fragment key={item.title}>
                    <ListItem
                      button
                      component="li"
                      onClick={() => handleClick(index)}
                      selected={pathWithoutLastPart === item.href}
                      sx={{
                        mb: 1,
                        ...(pathWithoutLastPart === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.secondary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathWithoutLastPart === item.href && {
                            color: "white",
                            fontSize: "16px",
                          }),
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                      {index === open || pathWithoutLastPart === item.href ? (
                        <ExpandMoreIcon fontSize="16px" />
                      ) : (
                        <ChevronRightIcon fontSize="16px" />
                      )}
                    </ListItem>
                    <Collapse
                      in={index === open || pathWithoutLastPart === item.href}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="li" disablePadding>
                        {item.children.map((child) => {
                          return (
                            <NextLink
                              key={child.title}
                              href={child.href}
                              onClick={onSidebarClose}
                            >
                              <ListItem
                                button
                                selected={pathDirect === child.href}
                                // sx={{
                                //   mb: 1,
                                //   ...(pathWithoutLastPart === child.href && {
                                //     color: "primary.main",
                                //     backgroundColor: "green !important",
                                //   }),
                                // }}
                                sx={{
                                  mb: 1,
                                  ...(pathDirect === child.href && {
                                    color: "white",
                                    backgroundColor: (theme) =>
                                      `${theme.palette.primary.main}!important`,
                                  }),
                                }}
                              >
                                <ListItemIcon
                                  // sx={{
                                  //   svg: { width: "14px", marginLeft: "3px" },
                                  //   ...(pathDirect === child.href && {
                                  //     color: "primary.main",
                                  //     fontSize: "18px",
                                  //   }),
                                  sx={{
                                    ...(pathDirect === child.href && {
                                      color: "white",
                                      fontSize: "16px",
                                    }),
                                    // }}
                                  }}
                                >
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText>{child.title}</ListItemText>
                              </ListItem>
                            </NextLink>
                          );
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
                //  {/********If Sub No Menu**********/}
              } else {
                return (
                  <List component="li" disablePadding key={item.title}>
                    <NextLink href={item.href}>
                      <ListItem
                        onClick={() => handleClick(index)}
                        button
                        selected={pathDirect === item.href}
                        sx={{
                          mb: 1,
                          ...(pathDirect === item.href && {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          }),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ...(pathDirect === item.href && { color: "white" }),
                            fontSize: "16px",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText onClick={onSidebarClose}>
                          {item.title}
                        </ListItemText>
                      </ListItem>
                    </NextLink>
                  </List>
                );
              }
            })}
          </List>
        </Box>
      </Box>
    </SimpleBar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
}
export default SideNavbar;
