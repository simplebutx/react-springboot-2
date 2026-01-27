import { useEffect, useState } from "react";
import api from "@/shared/api/axios";

function Health() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await api.get("/api/health");
        setMsg(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div>
      <h3>React ↔ Spring 연결테스트</h3>
      <p>{msg}</p>
    </div>
  );
}

export default Health;
