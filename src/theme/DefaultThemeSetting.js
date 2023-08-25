import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FinalTheme } from "./Theme";

const DefaultThemeSetting = () =>{
    const ThemeCustom = useSelector((state) => state.ThemeCustomReducer);
     return FinalTheme({theme: ThemeCustom.activeTheme});
}

export default DefaultThemeSetting;