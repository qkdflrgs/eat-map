export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/users/my", "/stores/new", "/stores/:id/edit", "/users/likes"],
};
