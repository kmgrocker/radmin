import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import "./organizationModal.scss";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { headerConfig, resolveGetByIdURL } from "../../../utils/helper";
import axios from "axios";
import { ModalActionContext } from "../../../home/Home";
import { BASE_URL } from "../../../utils/constant";

export const OrgnaziationModal = ({ setOpen }) => {
  const [org, setOrg] = useState("");
  const [theme, setTheme] = useState("");
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");
  const { actionType, fetchItemId, selected, setActionType } =
    useContext(ModalActionContext);

  const addOrg = async (actionType) => {
    let url = `${BASE_URL}/org`;
    let method = "post";
    const actionPayload = {
      name: org,
      theme: theme,
    };
    if (actionType === "edit") {
      url = `${BASE_URL}/org/${fetchItemId}`;
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
        setOrg(data?.data?.name);
        setTheme(data?.data?.theme);
      } catch (error) {
        setError(true);
        setErrorHelperText("something went wrong please try again");
        setOrg("");
        setTheme("");
      }
    };
    if (fetchItemId) {
      fetchItem();
    }
  }, [fetchItemId, selected, actionType]);

  const handleSubmit = async () => {
    if (!org || !theme) {
      setError(true);
      setErrorHelperText("action can not be empty");
      return;
    } else {
      await addOrg(actionType);
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
      <DialogTitle>Organizations</DialogTitle>
      <DialogContent>
        <form>
          <div className="formgroup">
            <label>organization name*</label>
            <OutlinedInput
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              sx={{ width: "60%" }}
              error={error}
              id="orgname"
              placeholder="Please enter organization name"
            />
          </div>

          <div className="formgroup">
            <label>select theme</label>
            <FormControl sx={{ width: "60%" }}>
              <Select
                id="demo-simple-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="select theme"
              >
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="green">green</MenuItem>
                <MenuItem value="blue">blue</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="formgroup">
            <label>organization logo</label>
            <OutlinedInput type="file" id="orglogo" sx={{ width: "60%" }} />
          </div>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: "4%" }}>
        <Button variant="contained" onClick={handleSubmit}>
        {fetchItemId ? 'Edit':'Add'} Organizations
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

OrgnaziationModal.propTypes = {
  setOpen: PropTypes.func,
};
