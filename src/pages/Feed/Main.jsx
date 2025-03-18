import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../components/Loader";
import Post from "../../components/Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    // verileri alınacak koleksiyonun referansını al
    const ref = collection(db, "tweets");

    // sorgu ayarlarını yap
    const q = query(ref, orderBy("createdAt", "desc"));

    // koleksiyona abone ol
    const unsub = onSnapshot(q, (snapshot) => {
      // tweetlerin geçici olarak tutulacağı dizi
      const temp = [];

      // dökümanların içerisindeki veriye erişip geçici diziye aktarıyoruz
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      // state'i güncelle
      setTweets(temp);
    });

    // bileşen ekrandan ayrıldığında aboneliği durdur.
    return () => unsub();
  }, []);

  return (
    <main className="border border-zinc-600 overflow-y-auto">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Anasayfa
      </header>

      <Form user={user} />

      {!tweets ? (
        <div className="flex justify-center my-20 scale-[1.5]">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;
