import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import "./userModal.scss";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabPanel } from "../../TabPanel/TabPanel";
import { a11yProps, headerConfig, resolveGetByIdURL } from "../../../utils/helper";
import { ModalActionContext } from "../../../home/Home";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";

export const UserModal = ({ setOpen }) => {
  const [orgName, setOrgName] = useState("ADCB");
  const [orgId, setOrgId] = useState("ADCB");
  const [orgs,setOrgs] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");
  const { actionType, fetchItemId, selected,setActionType } =
  useContext(ModalActionContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRole = (val) => {
    setRole(val.name);
  };

  const getRole = (val) => {
    return val === role;
  };

  const handleOrgChange = (e)=>{  
    setOrgId(e.target.value)
    setOrgName(e.target.value)
  }

  const addUser = async (actionType) => {
    let url = `${BASE_URL}/user`;
    let method = "post";
    const actionPayload = {
      firstname: fname,
      lastname: lname,
      email: email,
      roles: role,
      organization: orgId,
    };
    if (actionType === "edit") {
      url = `${BASE_URL}/user/${fetchItemId}`;
      method = "put";
    }
    try {
      const { data } = await axios({
        method: method,
        url: url,
        data: actionPayload,
        headers: headerConfig,
      });
      if (data) {
        setError(false);
        setErrorHelperText("");
        setActionType("");
        setOpen(false);
      }
    } catch (error) {
      setError(true);
      setErrorHelperText("something went wrong");
      setOpen(true);
    }
  };

  const handleSubmit = async() => {
    if (!lname || !fname || !email || !role || !orgName) {
      setError(true);
      setErrorHelperText("action can not be empty");
      return;
    }else {
      await addUser(actionType);
    }
  };



  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          resolveGetByIdURL(selected, fetchItemId)
        );
        setOrgName(data?.data?.organization);
        setFname(data?.data?.firstname);
        setLname(data?.data?.lastname);
        setEmail(data?.data?.email);
        setRole(data?.data?.roles);
      } catch (error) {
        setError(true);
        setErrorHelperText("something went wrong please try again");
        setOrgName("");
        setFname("");
        setLname("");
        setEmail("");
        setRole("");
      }
    };
    const fetchOrg = async()=>{
      const {data:{data:orgs}} = await axios.get(`${BASE_URL}/orgs`);
      setOrgs(orgs)
  }
  fetchOrg();
    if (fetchItemId) {
      fetchItem();
    }
  }, [fetchItemId, selected, actionType]);



  return (
    <Box
      sx={{
        minWidth: 600,
        height: "auto",
        color: "black",
        fontWeight: 500,
      }}
    >
      <DialogTitle>Users</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="User Role">
              <Tab label="User" {...a11yProps(0)} />
              <Tab label="User Role" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <form>
              <div className="formgroup">
                <label>First name*</label>
                <OutlinedInput
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  sx={{ width: "60%" }}
                  id="fname"
                  error={error}
                  placeholder="Enter user's first name"
                />
              </div>
              <div className="formgroup">
                <label>Last name*</label>
                <OutlinedInput
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  sx={{ width: "60%" }}
                  id="lname"
                  placeholder="Enter user's last name"
                />
              </div>
              <div className="formgroup">
                <label>Email*</label>
                <OutlinedInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: "60%" }}
                  id="email"
                  placeholder="Enter user's email"
                />
              </div>

              <div className="formgroup">
                <label>Orgnaization</label>
                <FormControl sx={{ width: "60%" }}>
                  <Select
                    id="org-select"
                    value={orgName}
                    onChange={handleOrgChange}
                    placeholder="select Organization"
                  >
    
                      {orgs?.map(org=>{
                      return (
                        <MenuItem key={org._id} name={org._id}   data-id={org._id} selected={org.name === orgName} value={org._id}>{org.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={getRole("admin")}
                        name="admin"
                        onChange={(e) => handleRole(e.target)}
                      />
                    }
                    label="admin"
                  />
                </Grid>
                <Grid item xs={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={getRole("General Manager")}
                        name="General Manager"
                        onChange={(e) => handleRole(e.target)}
                      />
                    }
                    label="General Manager"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={getRole("Chief Manager")}
                        name="Chief Manager"
                        onChange={(e) => handleRole(e.target)}
                      />
                    }
                    label="Chief Manager"
                  />
                </Grid>
                <Grid item xs={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={getRole("Accountant")}
                        name="Accountant"
                        onChange={(e) => handleRole(e.target)}
                      />
                    }
                    label="Accountant"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={getRole("Teller")}
                        name="Teller"
                        onChange={(e) => handleRole(e.target)}
                      />
                    }
                    label="Teller"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "4%" }}>
        <Button variant="contained" onClick={handleSubmit}>
        {fetchItemId ? 'Edit':'Add'} User
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

UserModal.propTypes = {
  setOpen: PropTypes.func,
};
