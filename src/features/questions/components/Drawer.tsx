import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const SideDrawer: React.FC<IProps> = ({ open, setOpen, children }) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250, position: "relative" }}>{children}</Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideDrawer;
