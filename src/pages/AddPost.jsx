import React from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/postForm/PostForm";

const AddPost = () => {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
