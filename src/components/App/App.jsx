/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from "react-router-dom";

import { ArticlesList } from "../ArticlesList";
import { ArticleForm } from "../Article/ArticleForm";
import SignUp from "../User/SignUp/SignUp";
import { SignIn } from "../User/SignIn";
import { Profile } from "../User/Profile";
import { CreateArticle } from "../Article/CreateArticle";
import Layout from "../Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<ArticleForm />} />
          <Route path="/articles/:slug/edit" element={<CreateArticle />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
