import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import _ from "lodash";
import { typography, components } from "./MIComponentOverride";

const baseTheme = {
  palette: {
    primary: {
      main: "#33afc1",
      light: "#e5fafb",
      dark: "#189AB4",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFA384",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fafbfb",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  typography,
};

const themesOptions = [
  {
    name: "DEFAULT_THEME",
    palette: {
      primary: {
        main: "#33afc1",
        light: "#e5fafb",
        dark: "#189AB4",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FFA384",
        light: "#fcf1ed",
        dark: "#e67e5f",
        contrastText: "#ffffff",
      },
    },
  },
];

export const FinalTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  const ThemeCustom = useSelector((state) => state.ThemeCustomReducer);
  const baseMode = {
    palette: {
      mode: ThemeCustom.activeMode,
      background: {
        default: ThemeCustom.activeMode === "dark" ? "#20232a" : "#fafbfb",
        dark: ThemeCustom.activeMode === "dark" ? "#1c2025" : "#ffffff",
        paper: ThemeCustom.activeMode === "dark" ? "#282C34" : "#ffffff",
      },
      text: {
        primary:
          ThemeCustom.activeMode === "dark" ? "#e6e5e8" : "rgba(0, 0, 0, 0.87)",
        secondary: ThemeCustom.activeMode === "dark" ? "#adb0bb" : "#777e89",
      },
    },
  };

  return createTheme(_.merge({}, baseTheme, baseMode, themeOptions, {}));
};
