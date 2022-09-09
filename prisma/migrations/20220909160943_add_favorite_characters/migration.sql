-- CreateTable
CREATE TABLE "FavoriteCharacters" (
    "id" TEXT NOT NULL,
    "id_api" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "origin_name" TEXT NOT NULL,
    "origin_url" TEXT NOT NULL,
    "location_name" TEXT NOT NULL,
    "location_url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "episode" TEXT[],
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_id" TEXT NOT NULL,

    CONSTRAINT "FavoriteCharacters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteCharacters" ADD CONSTRAINT "FavoriteCharacters_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
