import { ListTable } from "../components/listTable/ListTable";
import { NavBar } from "../components/navbar/Navbar";
import { Sidebar } from "../components/sidebar/SideBar";
import {
  userColumns,
  orgColumns,
  roleColumns,
  actionColumns,
  buisnessFunctionColumns,
} from "../datatablesource";
import "./home.scss";
import { useEffect, useState, createContext } from "react";
import { Modal } from "../components/modal/Modal";
export const ModalActionContext = createContext({
  actionType: "",
  setActionType: () => {
    return;
  },
  fetchItemId: "",
  setFetchItemId: () => {
    return;
  },
  selected: "",
  isRefetchRequired: false,
  setSelected: () => {
    return;
  },
});
export const Home = () => {
  const [selected, setSelected] = useState("Organizations");
  const [open, setOpen] = useState(false);
  const [dataColumns, setDataColumns] = useState(orgColumns);
  const [actionType, setActionType] = useState("");
  const [fetchItemId, setFetchItemId] = useState("");

  useEffect(() => {
    if (selected === "Users") {
      setDataColumns(userColumns);
    }

    if (selected === "Organizations") {
      setDataColumns(orgColumns);
    }

    if (selected === "Roles") {
      setDataColumns(roleColumns);
    }

    if (selected === "Actions") {
      setDataColumns(actionColumns);
    }
    if (selected === "Buisness Functions") {
      setDataColumns(buisnessFunctionColumns);
    }
  }, [selected]);

  return (
    <div className="home">
      <NavBar />
      <ModalActionContext.Provider
        value={{
          actionType,
          setActionType,
          fetchItemId,
          setFetchItemId,
          selected,
          setSelected,
        }}
      >
        <div className="homeContainer">
          <div className="leftPanel">
            <Sidebar setSelected={setSelected} />
          </div>
          <div className="rightPanel">
            {dataColumns.length > 0 && (
              <ListTable
                tableName={selected}
                dataColumns={dataColumns}
                setOpen={setOpen}
                open={open}
              />
            )}
            <Modal open={open} setOpen={setOpen} selected={selected} />
          </div>
        </div>
      </ModalActionContext.Provider>
    </div>
  );
};
