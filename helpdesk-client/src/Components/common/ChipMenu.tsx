import React, { useState } from "react";
import { Chip, Menu, MenuItem } from "@mui/material";
import { Mode } from "@mui/icons-material";

interface Option {
  id: number;
  label: string;
}

interface ChipMenuProps {
  label: string;
  color?: string;
  options: Option[];
  onSelect: (id: number, label: string) => void;
  disableMenu?: boolean;
  disabledLabels?: string[];
}

const ChipMenu: React.FC<ChipMenuProps> = ({
  label,
  color,
  options,
  onSelect,
  disableMenu = false,
  disabledLabels = [],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disableMenu) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const isOptionDisabled = (optionLabel: string) => {
    return (
      optionLabel.toLowerCase() === label.toLowerCase() ||
      disabledLabels.some(
        (disabled) => disabled.toLowerCase() === optionLabel.toLowerCase()
      )
    );
  };

  return (
    <>
      <Chip
        label={label ? label : "N/A"}
        size="small"
        variant="outlined"
        onClick={handleClick}
        icon={
          !disableMenu ? (
            <Mode sx={{ fontSize: "14px" }} color="primary" />
          ) : undefined
        }
        sx={{
          borderColor: color,
          color: color,
          fontWeight: 600,
          fontSize: "0.80rem",
          cursor: disableMenu ? "not-allowed" : "pointer",
          padding: "16px 10px",
          opacity: disableMenu ? 0.6 : 1,
        }}
      />

      {!disableMenu && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {options.map((option) => (
            <MenuItem
              key={option.id}
              disabled={isOptionDisabled(option.label)}
              onClick={() => {
                if (!isOptionDisabled(option.label)) {
                  handleClose();
                  onSelect(option.id, option.label);
                }
              }}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default ChipMenu;
