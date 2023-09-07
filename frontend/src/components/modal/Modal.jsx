
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { OrgnaziationModal } from "./organizationModal/OrganizationModal";
import { RoleModal } from "./roleModal/RoleModal";
import { UserModal } from "./userModal/UserModal";
import { ActionModal } from "./actionModal/ActionModal";
import { BuisnessFunctionModal } from "./buisnessFunctionModal/buisnessFunctionModal";


export function Modal({ open, setOpen,selected }) {

  const handleClose = () => {
    setOpen(false);
  };

  if(!selected){
   return null
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
         {selected === 'Organizations' && <OrgnaziationModal setOpen={setOpen} />}
         {selected === 'Roles' && <RoleModal setOpen={setOpen} />}
         {selected === 'Users' && <UserModal setOpen={setOpen} />}
         {selected === 'Actions' && <ActionModal setOpen={setOpen} />}
         {selected === 'Buisness Functions' && <BuisnessFunctionModal setOpen={setOpen} />}
      </Dialog>
    </div>
  );
}
Modal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selected:PropTypes.string
};
