import { Button } from "@mui/material";
import PropTypes from 'prop-types';
import "./sidebar.scss";

export const Sidebar = ({setSelected}) => {
    const selectionHandler = (selection)=>{
      setSelected(selection)
    }
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Button disableRipple variant="text" onClick={()=>selectionHandler('Organizations')}>
            Organizations
          </Button>
        </li>
        <li>
          <Button disableRipple variant="text" onClick={()=>selectionHandler('Roles')}>
            Roles
          </Button>
        </li>
        <li>
          <Button disableRipple variant="text" onClick={()=>selectionHandler('Users')}>
            Users
          </Button>
        </li>
        <li>
          <Button disableRipple variant="text" onClick={()=>selectionHandler('Actions')}>
            Actions
          </Button>
        </li>
        <li>
          <Button disableRipple variant="text" onClick={()=>selectionHandler('Buisness Functions')}>
            Buisness Functions
          </Button>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
 setSelected:PropTypes.func
}