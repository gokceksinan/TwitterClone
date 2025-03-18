import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase";

const Modal = ({ tweet, close }) => {
  // form gönderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const text = e.target[0]?.value;

    // güncellencek olan dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    // eğer dosya seçilmediyse sadece yazıyı güncelle
    try {
      //modalı kapat
      close();
      return await updateDoc(tweetRef, {
        textContent: text,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-zinc-800/60 z-[9999] 
    grid place-items-center bg-opacity-60"
    >
      <div
        className="bg-black rounded-md py-10 px-8 w-3/4 max-w-[500px] 
      min-h-[40vh] max-h-[50vh] flex flex-col"
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Tweet'i Düzenle</h1>

          <button onClick={close}>
            <IoMdClose className="text-3xl transition hover:text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 mt-10 justify-between"
        >
          <label>İçeriği Değiştir.</label>
          <input
            defaultValue={tweet.textContent}
            className="mt-4 border rounded-md py-1 px-2 text-black bg-white"
            name="title"
            type="text"
          />

          <div className="flex justify-end gap-5">
            <button
              onClick={close}
              className="bg-gray-500 py-2 px-4 rounded-full
             hover:bg-gray-600"
              type="button"
            >
              Vazgeç
            </button>
            <button
              className="bg-blue-500 py-2 px-4 rounded-full 
            hover:bg-blue-600 min-[80px] flex justify-center items-center "
              type="submit"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
