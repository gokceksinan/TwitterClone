import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // kullanıcı hesap bilgilerini alıyoruz ve state'e aktar
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);
    });

    // componentWillUnmount tetiklendiğinde yani bileşen ekrandan ayrıldığında
    // kullanıcı oturumunu izlemeyi durdur.
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden text-white">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
