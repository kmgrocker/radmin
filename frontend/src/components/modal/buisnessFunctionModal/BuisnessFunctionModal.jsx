import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import "./buisnessFunctionModal.scss";
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
  FormHelperText,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabPanel } from "../../TabPanel/TabPanel";
import {
  a11yProps,
  headerConfig,
  resolveGetByIdURL,
} from "../../../utils/helper";
import { ModalActionContext } from "../../../home/Home";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";

export const BuisnessFunctionModal = ({ setOpen }) => {
  const [buisnessFunctionName, setBuisnessFunctionName] = useState("");
  const [parentBuisnessFunction, setParentBuisnessFunction] = useState("");

  const [actions, setActions] = useState([]);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");
  const { actionType, fetchItemId, selected, setActionType } =
    useContext(ModalActionContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleActionChange = (event) => {
  
    if (event.target.checked && !actions.includes(event.target.name)) {
      setActions((prev) => [...prev, event.target.name]);
    }
    if (!event.target.checked && actions.includes(event.target.name)) {
      let newActions = actions.filter((v) => v !== event.target.name);
      setActions([...newActions]);
    }
  };

  const addBuisnessFunction = async (actionType) => {
    let url = `${BASE_URL}/buisness`;
    let method = "post";
    const actionPayload = {
      buisness: buisnessFunctionName,
      parentBuisness: parentBuisnessFunction,
      actions: actions,
    };
    if (actionType === "edit") {
      url = `${BASE_URL}/buisness/${fetchItemId}`;
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

  const handleSubmit = async () => {
    if (!buisnessFunctionName || !parentBuisnessFunction || !actions) {
      setError(true);
      setErrorHelperText("action can not be empty");
      return;
    } else {
      await addBuisnessFunction(actionType);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          resolveGetByIdURL(selected, fetchItemId)
        );
        setActions(data?.data?.actions);
        setBuisnessFunctionName(data?.data?.buisness);
        setParentBuisnessFunction(data?.data?.parentBuisness);
      } catch (error) {
        setError(true);
        setErrorHelperText("something went wrong please try again");
        setActions([]);
        setBuisnessFunctionName("");
        setParentBuisnessFunction("");
      }
    };
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
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Buisness Function"
            >
              <Tab label="Buisness Function" {...a11yProps(0)} />
              <Tab label="Actions" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <form>
              <div className="formgroup">
                <label> Buisness function name*</label>
                <OutlinedInput
                  value={buisnessFunctionName}
                  onChange={(e) => setBuisnessFunctionName(e.target.value)}
                  sx={{ width: "60%" }}
                  error={error}
                  id="buisnessfunction"
                  placeholder="Enter buisness function name"
                />
              </div>

              <div className="formgroup">
                <label>Parent buisness function</label>
                <FormControl sx={{ width: "60%" }}>
                  <Select
                    id="parent-buisness-select"
                    value={parentBuisnessFunction}
                    onChange={(e) => setParentBuisnessFunction(e.target.value)}
                    placeholder="select buisness function"
                  >
                    <MenuItem value="payment">payment</MenuItem>
                    <MenuItem value="account">account</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
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
                        name="view"
                        checked={actions.includes("view")}
                        onChange={handleActionChange}
                      />
                    }
                    label="view"
                  />
                </Grid>
                <Grid item xs={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="edit"
                        checked={actions.includes("edit")}
                        onChange={handleActionChange}
                      />
                    }
                    label="edit"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="delete"
                        checked={actions.includes("delete")}
                        onChange={handleActionChange}
                      />
                    }
                    label="delete"
                  />
                </Grid>
                <Grid item xs={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={actions.includes("create")}
                        name="create"
                        onChange={handleActionChange}
                      />
                    }
                    label="create"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "4%" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {fetchItemId ? "Edit" : "Add"} Buisness Function
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

BuisnessFunctionModal.propTypes = {
  setOpen: PropTypes.func,
};
