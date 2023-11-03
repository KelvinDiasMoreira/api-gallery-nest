/*
  Warnings:

  - Added the required column `data` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" ADD COLUMN     "data" TEXT NOT NULL;
