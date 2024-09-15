export type NewUserProps = {
  authId: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL;
};

export type CurrentUserProps = {
  id: string;
  name: string;
  email: string;
  username: string;
  imageUrl: string;
  bio: string;
};

export type UpdateUserProps = {
  userId: string;
  name: string;
  bio?: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};
