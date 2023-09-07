import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CheckBoxLabel } from "../CheckBoxLabel/CheckBoxlabel";
import PropTypes from "prop-types";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function Permissions({permissions,setPermissions}) {
  const [expanded, setExpanded] = React.useState("admin");
 

  const handleChecked = (event) => {
    if (event.target.checked && !permissions.includes(event.target.name)) {
      setPermissions((prev) => [...prev, event.target.name]);
    }
    if (!event.target.checked && permissions.includes(event.target.name)) {
      let newPermissions = permissions.filter((v) => v !== event.target.name);
      setPermissions([...newPermissions]);
    }
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <div>
       <Accordion
        expanded={expanded === "payment"}
        onChange={handleChange("payment")}
      >
        <AccordionSummary aria-controls="payment-content" id="payment-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="payment" />}
            />
          </div>
        </AccordionSummary>
    
      </Accordion>
       <Accordion
        expanded={expanded === "account"}
        onChange={handleChange("account")}
      >
        <AccordionSummary aria-controls="account-content" id="account-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="account" />}
            />
          </div>
        </AccordionSummary>
    
      </Accordion>
      <Accordion
        expanded={expanded === "admin"}
        onChange={handleChange("admin")}
      >
        <AccordionSummary aria-controls="admin-content" id="admin-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="admin" />}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 5,
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={permissions.includes('roles')} name="roles" onChange={handleChecked} />}
            label={<CheckBoxLabel label="roles" />}
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.includes('actions')} name="actions" onChange={handleChecked} />}
            label={<CheckBoxLabel label="actions" />}
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.includes("buisnessFunctions")} name="buisnessFunctions" onChange={handleChecked} />}
            label={<CheckBoxLabel label="buisnessFuntions" />}
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.includes("organizations")} name="organizations" onChange={handleChecked} />}
            label={<CheckBoxLabel label="organizations" />}
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.includes("users")} name="users" onChange={handleChecked} />}
            label={<CheckBoxLabel label="users" />}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "loans"}
        onChange={handleChange("loans")}
      >
        <AccordionSummary aria-controls="loans-content" id="loans-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="loans" />}
            />
          </div>
        </AccordionSummary>
    
      </Accordion>
      <Accordion
        expanded={expanded === "cashmanagement"}
        onChange={handleChange("cashmanagement")}
      >
        <AccordionSummary aria-controls="cashmanagement-content" id="cashmanagement-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="cashmanagement" />}
            />
          </div>
        </AccordionSummary>
    
      </Accordion>
      <Accordion
        expanded={expanded === "tradefinance"}
        onChange={handleChange("tradefinance")}
      >
        <AccordionSummary aria-controls="tradefinance-content" id="tradefinance-header">
          <div>
            <FormControlLabel
              control={<Checkbox />}
              label={<CheckBoxLabel label="tradefinance" />}
            />
          </div>
        </AccordionSummary>
    
      </Accordion>

    </div>
  );
}

Permissions.propTypes = {
  permissions: PropTypes.array,
  setPermissions: PropTypes.func,
};
