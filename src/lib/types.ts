export type FormStep = 0 | 1 | 2;

export type Profile = {
  bio?: string | null | undefined;
  username: string;
  isPublic: boolean;
  imageUrl: string;
  socials: {
    url: string;
    typeId: number;
    type: string;
  }[];
};
