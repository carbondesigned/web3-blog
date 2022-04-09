import { expect } from "chai";
import { ethers } from "hardhat";

describe("Blog", function () {
  it("Should create a post", async function () {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();
    await blog.createPost("My first post", "Hello World!");

    const posts = await blog.getPosts();
    expect(posts[0].title).to.equal("My first post");
  });

  it("Should edit a post by publishing it", async function () {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();
    await blog.createPost("My Second post", "Hello World 2!");

    await blog.updatePost(1, "My second post", "Hello World 2!", true);

    let posts = await blog.getPosts();
    expect(posts[0].title).to.equal("My second post");
  });

  it("should update the blog's name", async () => {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("My blog");
    await blog.deployed();

    expect(await blog.name()).to.equal("My blog");

    await blog.updateName("My new blog name");
    const name = await blog.name();
    expect(name).to.equal("My new blog name");
  });
});
