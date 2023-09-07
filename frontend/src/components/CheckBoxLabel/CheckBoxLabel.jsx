
import PropTypes from "prop-types";
import FolderIcon from '@mui/icons-material/Folder';

export const CheckBoxLabel = ({label})=>{
    return (
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <FolderIcon sx={{color:'rgb(248, 215, 117)'}}/>
            <span style={{marginLeft:'5px'}}>{label}</span>
        </div>
    )
}

CheckBoxLabel.propTypes = {
   label:PropTypes.string
}