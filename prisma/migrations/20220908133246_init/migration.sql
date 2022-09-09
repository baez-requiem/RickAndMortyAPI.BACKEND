-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_token_key" ON "Tokens"("token");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
