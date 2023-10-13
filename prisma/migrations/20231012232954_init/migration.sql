/*
  Warnings:

  - Added the required column `name` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `img` LONGBLOB NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
