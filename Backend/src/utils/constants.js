export const defaultAvatarUrl = (name) => {
  return (
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name || "User") +
    "&background=random"
  );
};