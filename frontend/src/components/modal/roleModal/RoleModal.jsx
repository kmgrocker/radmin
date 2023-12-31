import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import "./roleModal.scss";
import {
  Box,
  FormControl,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabPanel } from "../../TabPanel/TabPanel";
import {
  a11yProps,
  headerConfig,
  resolveGetByIdURL,
} from "../../../utils/helper";
import { Permissions } from "../../Permission/Permission";
import { ModalActionContext } from "../../../home/Home";
import { BASE_URL } from "../../../utils/constant";
import axios from "axios";

export const RoleModal = ({ setOpen }) => {
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [role, setRole] = useState("");
  const [orgs,setOrgs] = useState([])
  const [value, setValue] = useState(0);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");
  const { actionType, fetchItemId, selected, setActionType } =
    useContext(ModalActionContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOrgChange = (e)=>{  
    setOrgId(e.target.value)
    setOrgName(e.target.value)
  }
  const addRole = async (actionType) => {
    let url = `${BASE_URL}/role`;
    let method = "post";
    const actionPayload = {
      role: role,
      organization: orgId,
      permissions: permissions,
    };
    if (actionType === "edit") {
      url = `${BASE_URL}/role/${fetchItemId}`;
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

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          resolveGetByIdURL(selected, fetchItemId)
        );
        
        setOrgName(data?.data?.organization);
        setRole(data?.data?.role);
        setPermissions(data?.data?.permissions);
      } catch (error) {
        setError(true);
        setErrorHelperText("something went wrong please try again");
        setOrgName("");
        setRole("");
        setPermissions("");
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

  const handleSubmit = async () => {
    if (!orgName || !role || !permissions) {
      setError(true);
      setErrorHelperText("action can not be empty");
      return;
    } else {
      await addRole(actionType);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 600,
        height: "auto",
        color: "black",
        fontWeight: 500,
      }}
    >
      <DialogTitle>Roles</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="User Role">
              <Tab label="Role" {...a11yProps(0)} />
              <Tab label="Permissions" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <form>
              <div className="formgroup">
                <label>Role name*</label>
                <OutlinedInput
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ width: "60%" }}
                  id="rolename"
                  error={error}
                  placeholder="Enter role name"
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
                   
                    // defaultValue={orgName || ''}
                  >
                    {orgs?.map(org=>{

                      return (
                        <MenuItem key={org._id} name={org._id}  data-id={org._id} selected={org.name === orgName} value={org._id}>{org.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Permissions
              permissions={permissions}
              setPermissions={setPermissions}
            />
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "4%" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {fetchItemId ? "Edit" : "Add"} Role
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

RoleModal.propTypes = {
  setOpen: PropTypes.func,
};
