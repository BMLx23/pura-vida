export const navbarStyles = {
  drawer: {
    width: 320,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: "17vw",
      boxSizing: "border-box",
      backgroundColor: "#93c47d",
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .Mui-selected": {
      color: "red",
    },
  },
  icons: {
    color: "rgba(255, 255, 255, 0.7)!important",
    marginLeft: "20px",
  },
  text: {
    "& span": {
      marginLeft: "-10px",
      fontWeight: "600",
      fontSize: "16px",
    },
  },
};
