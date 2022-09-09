/*
  Warnings:

  - You are about to drop the column `location_url` on the `FavoriteCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `origin_url` on the `FavoriteCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `FavoriteCharacters` table. All the data in the column will be lost.
  - Added the required column `created` to the `FavoriteCharacters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteCharacters" DROP COLUMN "location_url",
DROP COLUMN "origin_url",
DROP COLUMN "url",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;
