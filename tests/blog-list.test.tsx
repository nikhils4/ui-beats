import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogList } from "@/components/website/blog-list";
import type { Post } from "@/lib/blog";

const makePost = (overrides: Partial<Post> & Pick<Post, "slug">): Post => ({
  title: `Post ${overrides.slug}`,
  date: "2025-01-01T00:00:00.000Z",
  description: "A description",
  image: "/blogs/example.png",
  imageAlt: "alt",
  author: "Nikhil Singh",
  authorBio: "bio",
  categories: ["Frontend"],
  tags: ["react"],
  featured: false,
  readTime: "3 min read",
  body: "content",
  ...overrides,
});

const posts: Post[] = [
  makePost({ slug: "alpha", categories: ["Frontend"] }),
  makePost({ slug: "beta", categories: ["Design"] }),
  makePost({ slug: "gamma", categories: ["Frontend", "Animation"] }),
];

const categories = ["All", "Animation", "Design", "Frontend"];

describe("BlogList", () => {
  it("shows every post under All", () => {
    render(<BlogList posts={posts} categories={categories} />);
    expect(screen.getByText("Post alpha")).toBeInTheDocument();
    expect(screen.getByText("Post beta")).toBeInTheDocument();
    expect(screen.getByText("Post gamma")).toBeInTheDocument();
  });

  it("filters to the selected category", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} categories={categories} />);

    await user.click(screen.getByRole("button", { name: "Design" }));

    // AnimatePresence keeps the outgoing grid mounted until its exit
    // transition finishes, so assert once it has settled.
    await waitFor(() => {
      expect(screen.queryByText("Post alpha")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Post beta")).toBeInTheDocument();
    expect(screen.queryByText("Post gamma")).not.toBeInTheDocument();
  });

  it("marks the active filter with aria-pressed", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} categories={categories} />);

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Animation" }));
    expect(screen.getByRole("button", { name: "Animation" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows an empty state and can reset from it", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} categories={[...categories, "Empty"]} />);

    await user.click(screen.getByRole("button", { name: "Empty" }));
    expect(await screen.findByText("No posts found")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /view all posts/i }));
    expect(await screen.findByText("Post alpha")).toBeInTheDocument();
  });

  it("renders dates in a fixed locale", () => {
    // Rendering with the ambient locale differs between the server and the
    // browser, which React reports as a hydration mismatch.
    render(<BlogList posts={[posts[0]!]} categories={categories} />);
    expect(screen.getByText("Jan 1, 2025")).toBeInTheDocument();
  });
});
