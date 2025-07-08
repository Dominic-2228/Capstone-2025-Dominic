import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { HomePage } from "../components/Home/homePage.jsx";
import { AllPost } from "../components/AllPost/AllPost.jsx";
import { useEffect, useState } from "react";
import { MyPost } from "../components/MyPost/MyPost.jsx";
import { CreatePost } from "../components/CreatePost/CreatePost.jsx";
import { EditPost } from "../components/EditPost/EditPost.jsx";
import { Support } from "../components/Support/Support.jsx";
import { LikedPost } from "../components/LikedPost/LikedPost.jsx";
import { CommentPost } from "../components/Comment/Comment.jsx";
import { CreateComment } from "../components/Comment/CreateComment.jsx";
import { AboutUs } from "../components/AboutUs/AboutUs.jsx";
import { FaqJSX } from "../components/FAQ/Faq.jsx";
import { Bible } from "../components/Bible/Bible.jsx";
import { CopyRight } from "../components/CopyrightFooter/CopyRight.jsx";

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
              <NavBar currentUser={currentUser}/>
              <Outlet />
              <CopyRight/>
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="allposts" element={<AllPost currentUser={currentUser}/>} />
          <Route path="myposts" element={<MyPost currentUser={currentUser}/>}/>
          <Route path="createpost" element={<CreatePost currentUser={currentUser}/>}/>
          <Route path="myposts/:postId" element={<EditPost currentUser={currentUser}/>}/> 
          <Route path="support" element={<Support/>}/>
          <Route path="likedposts" element={<LikedPost currentUser={currentUser} />} />
          <Route path="comment/:postId" element={<CommentPost currentUser={currentUser}/>}/>
          <Route path="createcomment/:postId" element={<CreateComment currentUser={currentUser}/>}/>
          <Route path="aboutus" element={<AboutUs/>}/>
          <Route path="faq" element={<FaqJSX/>}/>
          <Route path="bible" element={<Bible currentUser={currentUser}/>}/>
        </Route>
      </Routes>
    </>
  );
};
