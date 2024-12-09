import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Drawer, List, ListItem, Divider } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs"

export default function TemporaryDrawer() {
  const [drawerIsOpened, setDrawerIsOpened] = useState(false);

  const list = (drawerIsOpened) => (
    <div className="w-72">
      <List className='mt-3'>
        <ListItem>
          Forms
        </ListItem>
      </List>
      <Divider />
      <List className='mt-3'>
        <ListItem className="mr-3 group hover:bg-gray-200 text-gray cursor-pointer">
          <FiSettings />
          <span className="ml-4 text-sm font-medium group-hover:font-semibold group-hover:text-black">Settings</span>
        </ListItem>
        <ListItem className="mr-3 group hover:bg-gray-200 text-gray cursor-pointer">
          <BsQuestionCircle />
          <span className="ml-4 text-sm font-medium group-hover:font-semibold group-hover:text-black">Feedback</span>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <>
        <IconButton onClick={() => setDrawerIsOpened(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={drawerIsOpened} onClose={() => setDrawerIsOpened(false)}>
          {list(drawerIsOpened)}
        </Drawer>
      </>
    </div>
  );
}
