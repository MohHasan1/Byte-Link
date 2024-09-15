export type NewPostProps = {
  userId: string;
  title: string;
  desc: string;
  location: string;
  tags: string;
  file: File[];
};

export type UpdatePostProps = {
  postId: string;
  title: string;
  desc: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location: string;
  tags: string;
};
