import { useNavigate } from 'react-router-dom';
import './Profile.css'
const Profile = () => {
    const navigate = useNavigate();
    const onclickHandler = () =>{
        navigate('/open-mail')
    }
  return (
    <div className="profile">
      <h1>Hi welcome to kitty Mail box </h1>
      <p>Now you can send emails semalessly</p>
      <button onClick={onclickHandler}>Open Mail</button>
    </div>
  );
};

export default Profile;
