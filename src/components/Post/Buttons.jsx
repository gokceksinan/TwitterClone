import React from "react";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { CiShare2 } from "react-icons/ci";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Buttons = ({ tweet }) => {
  //oturumu açık olan kullanıcı bu tweeti likeladı mı?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like butonuna tıklayınca
  // tıklayan kullanıcının idsini like'layanlar dizisine ekle
  const toggleLike = async () => {
    // güncellenecek dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    //kullanıcı likeladıysa:
    // user idsini likes dizisinden kaldır
    // likeladıysa user idsini likes dizisine ekle
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-[#0051ff3d] "
      >
        <LuMessageCircle />
      </div>

      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-[#00800067] "
      >
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-[rgba(249,65,219,0.42)] flex items-center gap-2"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        {tweet.likes.length}
      </div>

      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-[#80808065] "
      >
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
