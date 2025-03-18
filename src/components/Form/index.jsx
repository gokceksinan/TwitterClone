import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import Loader from "../Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1)inputlardaki veriye eriş
    const text = e.target[0].value;
    const image = e.target[1].files[0];

    // 2)yazı ve resim içeriği yoksa fonk durdur.
    if (!text && !image) {
      return toast.warning("Lütfen İçerik Giriniz", {
        position: "bottom-right",
      });
    }

    try {
      setIsLoading(true);
      // 3) todo resmi storage kaydet

      // 4) yeni tweet belgesini koleksiyona kaydet
      //4.1)koleksiyon referansı al
      const tweetsCol = collection(db, "tweets");

      //4.2)belgeyi kaydet
      await addDoc(tweetsCol, {
        textContent: text,
        imageContent: null,
        likes: [],
        createdAt: serverTimestamp(),
        isEdited: false,
        user: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
      });

      // 5) formu sıfırla
      e.target.reset();
    } catch (err) {
      console.log(err);
      toast.error("Bir hata oluştu");
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        src={user?.photoURL}
        className="rounded-full h-[35px] md:h-[45px] "
      />

      <div className="w-full">
        <input
          className="w-full mt-1 mb-2 bg-transparent outline-none 
        md:text-lg "
          placeholder="Neler Oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center">
          <label
            htmlFor="image"
            className="cursor-pointer text-lg transition p-4 rounded-full hover:bg-gray-800"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image" type="file" />

          <button
            className="bg-blue-600 px-3 py-2 min-w-[85px]
           min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Loader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
