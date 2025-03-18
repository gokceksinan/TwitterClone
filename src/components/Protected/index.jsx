import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Protected = () => {
  // Yetkisi var mı? statei
  const [isAuth, setIsAuth] = useState();

  // kullanıcının oturum verilerini al
  useEffect(() => {
    // bu method kullanıcı oturumu izler.
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);

  // eğer kullanıcının oturumu kapalıysa logine yönlendir
  if (isAuth === false) {
    return <Navigate to="/" replace />;
  }

  // oturum açıksa alt route'un bileşenini ekrana bas.
  return <Outlet />;
};

export default Protected;

// Navigate Bileşeni
// Bir bileşenin return satırında yönlendirme yapmamız gerkiyorsa useNavigate
// kullanıldığında hata verdiği için bu tarz return yönlendirmelerinde Navigate bileşeni kullanılır.
