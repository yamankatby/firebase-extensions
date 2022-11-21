import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import cx from "classnames";

const firebaseConfig = {}; // Put your web app's Firebase configuration here...

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userConverter = {
  toFirestore: (user) => {
    return {
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      name: data.name,
      email: data.email,
      photoURL: data.photoURL,
      id: snapshot.id,
    };
  },
};

const postConverter = {
  toFirestore: (post) => {
    return {
      body: post.body,
      createdById: post.createdById,
      createdBy: post.createdBy,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      body: data.body,
      createdById: data.createdById,
      createdBy: data.createdBy,
      id: snapshot.id,
    };
  },
};

const App = () => {
  const [users] = useCollectionData(collection(db, "users").withConverter(userConverter));
  const [posts] = useCollectionData(collection(db, "posts").withConverter(postConverter));

  console.log("users", users);
  console.log("posts", posts);

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="max-w-[72ch] mx-auto p-6">
        <p className="text-xl mb-3">Logged in as:</p>
        <div className="grid grid-cols-3 gap-6 mb-3">
          {users?.map((user) => (
            <button
              className={cx("p-3 rounded-xl hover:bg-black hover:bg-opacity-5 transition-colors relative", {
                "bg-blue-500 bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-20": currentUser === user.id,
              })}
              onClick={() => setCurrentUser(user.id)}
              key={user.id}
            >
              <button
                className="px-1.5 rounded-full absolute -right-3 -top-3 bg-red-300"
                onClick={() => {
                  deleteDoc(doc(db, "users", user.id));
                }}
              >
                delete
              </button>
              <form
                className="flex flex-col items-start"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const formData = new FormData(form);

                  console.log({
                    name: formData.get("name"),
                    email: formData.get("email"),
                  });

                  setDoc(
                    doc(collection(db, "users"), user.id),
                    {
                      name: formData.get("name"),
                      email: formData.get("email"),
                    },
                    { merge: true }
                  );
                }}
              >
                <button type="submit">
                  <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full" />
                </button>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="bg-transparent border-none focus:outline-none font-bold mt-2"
                  name="name"
                />
                <input
                  type="text"
                  defaultValue={user.email}
                  className="bg-transparent border-none focus:outline-none"
                  name="email"
                />
              </form>
            </button>
          ))}
        </div>

        {currentUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const formData = new FormData(form);

              addDoc(collection(db, "posts"), {
                body: formData.get("post"),
                createdById: currentUser,
              });

              form.reset();
            }}
            className="flex gap-6"
          >
            <input
              type="text"
              placeholder={`What's on your mind, ${users?.find((user) => user.id === currentUser)?.name}?`}
              className="w-full border border-gray-300 rounded-lg p-3"
              name="post"
            />
          </form>
        )}
        <hr className="my-8" />
        <p className="text-xl mb-3">Posts:</p>

        <div className="grid grid-cols-3 gap-6">
          {posts?.map((post) => (
            <>
              <div className="bg-blue-50 rounded-xl p-3">
                {post.createdBy ? (
                  <div className="flex items-center gap-3">
                    <img src={post.createdBy?.photoURL} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <h1>{post.createdBy?.name}</h1>
                      <p className="text-gray-600">{post.createdBy?.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-700 ml-11">Loading...</p>
                )}
                <hr className="my-1 border-blue-200 ml-11" />
                <p className="mt-2 ml-11">{post.body}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
