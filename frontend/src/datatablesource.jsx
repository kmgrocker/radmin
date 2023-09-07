export const userColumns = [
    {
      field: "firstname",
      headerName: "First Name",
      width: 230,
    },
    {
      field: "lastname",
      headerName: "Email",
      width: 230,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 230,
    },
    {
      field: "organization",
      headerName: "Organization",
      width: 230,
    },
  ];
  
  export const orgColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 420,
    },
    {
      field: "theme",
      headerName: "Theme",
      width: 420,
    },
  
    {
      field: "logo",
      headerName: "Logo",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.logo} alt="logo" />
          </div>
        );
      },
    },
  ];
  
  export const roleColumns = [
    {
      field: "role",
      headerName: "Role",
      width: 420,
    },
    {
      field: "organization",
      headerName: "Organization",
      width: 420,
    },
  ];
  
  export const actionColumns = [
    {
      field: "actionname",
      headerName: "Action",
      width: 800,
    },
  ];
  export const buisnessFunctionColumns = [
    {
      field: "buisness",
      headerName: "Name",
      width: 600,
    },
    {
      field: "parentBuisness",
      headerName: "Parent Buisness Function",
      width: 600,
    },
  ];
  

  