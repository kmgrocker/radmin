import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useContext } from "react";
import "./actionModal.scss";
import { Box, FormHelperText, OutlinedInput } from "@mui/material";
import { useState, useEffect } from "react";
import { ModalActionContext } from "../../../home/Home";
import { headerConfig, resolveGetByIdURL } from "../../../utils/helper";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";

export const ActionModal = ({ setOpen }) => {
  const [action, setAction] = useState("");
  const { actionType, fetchItemId, selected, setActionType } =
    useContext(ModalActionContext);
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const addAction = async (actionType) => {
    let url = `${BASE_URL}/action`;
    let method = "post";
    const actionPayload = {
      actionname: action,
    };
    if (actionType === "edit") {
      url = `${BASE_URL}/action/${fetchItemId}`;
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
        setAction(data?.data?.actionname);
      } catch (error) {
        setError(true);
        setErrorHelperText("something went wrong please try again");
        setAction("");
      }
    };
    if (fetchItemId) {
      fetchItem();
    }
  }, [fetchItemId, selected, actionType]);

  const handleSubmit = async () => {
    if (!action) {
      setError(true);
      setErrorHelperText("action can not be empty");
      return;
    } else {
      await addAction(actionType);
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
      <DialogTitle>Action</DialogTitle>
      <DialogContent>
        <form>
          <div className="formgroup">
            <label>Action name*</label>
            <div className="inputWrapper">
              <OutlinedInput
                value={action}
                name="action"
                error={error}
                onChange={(e) => setAction(e.target.value)}
                onBlur={() => {
                  setError(false);
                  setErrorHelperText("");
                }}
                sx={{ width: "70%" }}
                id="action"
                placeholder="Enter action name"
              />
              <FormHelperText sx={{ color: "red", fontSize: ".8rem" }}>
                {errorHelperText}
              </FormHelperText>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: "4%" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {fetchItemId ? "Edit" : "Add"} Action
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

ActionModal.propTypes = {
  setOpen: PropTypes.func,
};
