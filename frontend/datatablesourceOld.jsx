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

export const actionRows = [
  {id:1,actionname:'view'},
  {id:2,actionname:'edit'},
  {id:3,actionname:'delete'},
  {id:4,actionname:'create'},
]

export const roleRows = [
  {
    id: 1,
    role: "admin",
    organization:'ADCB'
  },
  {
    id: 2,
    role: "admin",
    organization:'Honda'
    
  },
  {
    id: 3,
    role: "General Manager",
    organization:'ADCB'
  },
  {
    id: 4,
    role: "Chief Manager",
    organization:'Nissan'
  },
  {
    id: 5,
    role: "Accountant",
    organization:'ADCB'
  },
];
export const orgRows = [
  {
    id: 1,
    name: "ADCB",
    theme: "red",
    logo: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: 2,
    name: "Honda",
    theme: "green",
    logo: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    id: 3,
    name: "Nissan",
    theme: "blue",
    logo: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
