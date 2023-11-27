import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 20px",
    borderBottom: "2px solid rgba(160, 160, 160, 0.3)",
    "& svg": {
      fill: "#C209C1",
    },
  },
  mainContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  imageWrapper: {
    display: "flex",
    gap: 20,
    // overflowX: 'auto',
    width: '100%'
  },
  inputFIeld: {
    display: "flex",
    alignItems: "center",
  },
  imageCard: {
    position: "relative",
    margin: 10,
    display: "inline-block",
  },
  dimImage: {
    
    opacity: 0.5,
  },
  centeredImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    '& img': {
        height: 600,
        width: 600
    }
  },
  editModeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    position: "absolute",
    top: -33,
    right: 20,
  },
});

export default useStyles;
