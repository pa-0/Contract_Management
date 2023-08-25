const INITIAL_STATE = {
    activeNavbarBgColor: '#0b70fb',
    activeSidebarBgColor: '#ffffff',
    activeMode: 'light', 
    activeTheme: 'DEFAULT_THEME',
    SidebarWidth: 240,
};

const ThemeCustomReducer = (state = INITIAL_STATE, action) => {
    if (action.type == "THEME_COLOR") {
        return {
            ...state,
            activeTheme: action.payload,
        };
    } else if (action.type == "DARK_THEME") {
        return {
            ...state,
            activeMode: action.payload,
        };
    } else if (action.type == "NAVBAR_BG") {
        return {
            ...state,
            activeNavbarBgColor: action.payload,
        };
    } else if (action.type == "SIDEBAR_BG") {
        return {
            ...state,
            activeSidebarBgColor: action.payload,
        };
    } else {
        return state;
    }

}

export default ThemeCustomReducer;