import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import MenuAppBar from "../MenuAppBar/MenuAppBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

export default function Profile() {
  const [token] = useLocalStorage("token", null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3042/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data.user);
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="container">
      <MenuAppBar />
      <h2>Profile</h2>
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
      <LogoutBtn />
    </div>
  );
}
