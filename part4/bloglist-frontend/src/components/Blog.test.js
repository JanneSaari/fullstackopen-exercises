import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog rendering", () => {
  const blog = {
    title: "Some Test Title",
    author: "Test Author",
    url: "some/test/url",
    likes: 2,
  };

  // Define commonly used elements and get them before each test
  let container;
  let blogTitleElement;
  let likesElement; //Invisible elements are still defined even though they are not showing
  let urlElement;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(
      <Blog id="test-element" blog={blog} updateBlogFn={mockHandler} />,
    ).container;
    blogTitleElement = container.querySelector("#test-element");
    likesElement = screen.getByText(`likes: ${blog.likes}`, { exact: false });
    urlElement = screen.getByText(`URL: ${blog.url}`, { exact: false });
  });

  test("Only title and author shown by default", () => {
    expect(blogTitleElement).toBeDefined();
    expect(likesElement).not.toBeVisible();
    expect(urlElement).not.toBeVisible();
  });

  test("After clicking show more, url and likes are shown", async () => {
    const user = userEvent.setup();
    const moreButton = screen.getByText("show more");
    await user.click(moreButton);

    expect(blogTitleElement).toBeDefined();
    expect(likesElement).toBeVisible();
    expect(urlElement).toBeVisible();
  });

  test("Clicking likes button twice calls function twice", async () => {
    const user = userEvent.setup();
    const likeBtn = container.querySelector("#like-blog-btn");
    expect(likeBtn).toBeDefined();
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
