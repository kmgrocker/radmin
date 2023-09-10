import "./listtable.scss";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "../../hooks/useFetch";

import { resolveGetByIdURL, resolveGetURL} from "../../utils/helper";
import axios from "axios";
import { ModalActionContext } from "../../home/Home";

export const ListTable = ({ tableName,dataColumns, setOpen,open }) => {

  const {setActionType,setFetchItemId} = useContext(ModalActionContext)

  const { data:{data:dataRows=[]}, loading, error,reFetch } = useFetch(resolveGetURL(tableName || "Organizations"));


useEffect(()=>{
  reFetch()
},[open])

  const handleDelete = async(selected,id) => {
    try {
      const {data} = await axios.delete(resolveGetByIdURL(selected,id))
      console.log(data);
      if(!data.success){
        alert(data.message);
        return;
      }
      reFetch();
    } catch (error) {
      if(!error?.response?.data?.success){
        alert(error?.response?.data?.message)
      }
      console.log('error',error)
    }
  };

  const handleEdit=async(e,selected,id)=>{
    e.stopPropagation()
    const {data} = await axios.get(resolveGetByIdURL(selected,id))
     if(data){
      setActionType('edit')
      setFetchItemId(id)
      setOpen(true)
     }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <IconButton aria-label="edit" size="large" onClick={(e)=>handleEdit(e,tableName,params.id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="large" onClick={() => handleDelete(tableName,params.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  if(loading){
    return (
      <div style={{position:'absolute',left:'50%',top:'50%',fontSize:'3rem'}}>Loading.....</div>
    )
  }
  if(error){
    return (<div>something is wrong please try again</div>)
  }
  return (
    <div className="datatable" key={tableName}>
      <div className="datatableTitle">
        <h4> {tableName}</h4>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setActionType('add')
            setFetchItemId("")
          }}
        >
          Create New {tableName}
        </Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={dataColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        getRowId={(row) => row._id}
        sx={{color:"black",fontSize:'1.2rem',}}
      />
    </div>
  );
};

ListTable.propTypes = {
  tableName: PropTypes.string,
  dataColumns: PropTypes.array,
  dataRows: PropTypes.array,
  setOpen: PropTypes.func,
  open:PropTypes.bool
};
