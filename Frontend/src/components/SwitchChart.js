import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function SwitchChart({ favourites, setCoin }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (fav) => {
    // console.log(fav);
    if (typeof fav.name === "string") setCoin(fav.id);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        style={{ marginTop: 20 }}
      >
        Change Crypto
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div class="coin_selection" style={{ display: "flex" }}>
          {favourites?.map((fav) => (
            <MenuItem onClick={() => handleClose(fav)}>{fav.name}</MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
}
