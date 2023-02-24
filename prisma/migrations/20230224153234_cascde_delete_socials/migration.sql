-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
