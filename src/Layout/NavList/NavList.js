"use client";

import { useRouter } from "next/navigation";
import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import { FiCalendar, FiSettings } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { SiDatabricks } from "react-icons/si";
import { CgDatabase } from "react-icons/cg";
import { AiOutlineAudit, AiOutlineInfoCircle } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { TbTemplate } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";

function NavList() {
  const router = useRouter();
  let NavbarList = [
    {
      id: 1,
      icon: <RxDashboard />,
      label: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      label: "Contract",
      icon: <FaFileContract />,
      link: "/contract",
    },
    {
      id: 3,
      label: "Documents Store",
      icon: <CgDatabase />,
      link: "/documentstore",
    },
    {
      id: 4,
      label: "Document Templates",
      icon: <TbTemplate />,
      link: "/documenttemplate",
    },
    {
      id: 5,
      label: "Audit",
      icon: <AiOutlineAudit />,
      link: "/audit",
    },
  ];
  //* Tab Controllers
  const [value1, setValue1] = React.useState(
    NavbarList.filter((e) => e.link == usePathname())[0]?.id
  );
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
    router.push(NavbarList.filter((e) => e.id == newValue)[0].link);
  };
  return (
    <TabContext value={value1}>
      <TabList
        onChange={handleChange1}
        sx={{
          width: "100%",
          height: "60px",
          pt: 0,
        }}
      >
        {NavbarList.map((data, i) => {
          return (
            <Tab
              sx={{
                fontSize: "15px",
                // mx: 1,
                color: "#b0afae",
                pt: 0,
              }}
              icon={data.icon}
              iconPosition="start"
              label={data.label}
              value={i + 1}
              key={i}
            />
          );
        })}
      </TabList>
    </TabContext>
  );
}

export default NavList;
