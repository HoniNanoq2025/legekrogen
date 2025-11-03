import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import styles from "./LogoutBtn.module.css";

export default function LogoutBtn() {
  const [, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    toast.info("Du er nu logget ud");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout} className={styles.logout}>
        Log ud
      </button>
    </div>
  );
}
