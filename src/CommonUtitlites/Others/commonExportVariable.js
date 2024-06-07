export const currentDate = new Date().toISOString().split("T")[0];
export let userName;
export let userId;
export let role ;

export default function setTokenAndRole (data) {
    console.log(data)
    userId=data.id
    userName=data.name
    role=data.role
return;
}

const intervalId = setInterval(() => {
  userId = localStorage.getItem('user_Id');
  userName = localStorage.getItem('user_Name');
  role = localStorage.getItem('role');
}, 500);
