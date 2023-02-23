import axios from "axios";

function generateImage(username: string) {
  return `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
}

async function isImage(image: string) {
  try {
    const { headers } = await axios.get(image);
    return String(headers["content-type"]).includes("image");
  } catch (error) {
    return false;
  }
}

export async function getImage(
  imageUrl: string | null | undefined,
  username: string
) {
  if (!imageUrl || !(await isImage(imageUrl))) {
    return generateImage(username);
  }

  return imageUrl;
}
