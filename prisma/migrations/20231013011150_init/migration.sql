/*
  Warnings:

  - Made the column `img` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `img` LONGBLOB NOT NULL;
