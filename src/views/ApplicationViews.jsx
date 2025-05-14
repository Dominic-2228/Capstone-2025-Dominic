import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { HomePage } from "../components/Home/homePage.jsx";
import { AllPost } from "../components/AllPost/AllPost.jsx";
import { useEffect, useState } from "react";
import { MyPost } from "../components/MyPost/MyPost.jsx";
import { CreatePost } from "../components/CreatePost/CreatePost.jsx";
import { EditPost } from "../components/EditPost/EditPost.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localBibleUser = localStorage.getItem("bible_user")
    const bibleUserObject = JSON.parse(localBibleUser)
    setCurrentUser(bibleUserObject)
  }, []);


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/allposts" element={<AllPost />} />
          <Route path="/myposts" element={<MyPost currentUser={currentUser}/>}/>
          <Route path="/createpost" element={<CreatePost currentUser={currentUser}/>}/>
          <Route path="/myposts/:postId" element={<EditPost currentUser={currentUser}/>}/> 
          <Route path="/likedposts" element={<div>Liked Posts</div>} />
        </Route>
      </Routes>
    </>
  );
};
