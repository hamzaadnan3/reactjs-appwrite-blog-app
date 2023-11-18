import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class BlogService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error creating post: createPost service", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Error creating post: updatePost service", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("Error creating post: deletePost service", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const document = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );

      return document; // Assuming document is the post object
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error; // Throw the error so it can be caught in the calling code
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error creating post: getPostss service", error);
      return false;
    }
  }

  //featuredImage file upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error creating post: uploadFile service", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error creating post: deleteFile service", error);
      return false;
    }
  }

  previewFile(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error creating post: previewFile service", error);
      return false;
    }
  }
}

const service = new BlogService();
export default service;
