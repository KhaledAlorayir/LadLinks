import { z } from "zod";

const SocialEntrySchema = z.object({
  url: z.string().url(),
  typeId: z.number(),
});

export const ProfileBodySchema = z.object({
  username: z.string().trim().min(1).max(40),
  isPublic: z.boolean(),
  imageUrl: z.string().url(),
  bio: z.string().trim().min(1).max(260).optional().nullable(),
  socials: z.array(SocialEntrySchema).min(1).max(15),
});

export const UsernameSchema = z.string().trim().min(1).max(40);

export type ProfileBody = z.infer<typeof ProfileBodySchema>;
export type SocialEntry = z.infer<typeof SocialEntrySchema>;
