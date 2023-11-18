import React from "react";
import service from "../appwrite/blogServices";
import { Link } from "react-router-dom";

const Card = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={(() => {
              try {
                return service.previewFile(featuredImage);
              } catch (error) {
                console.error("Error fetching image:", error);
                // You can return a placeholder image or handle the error in another way
              }
            })()}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default Card;
