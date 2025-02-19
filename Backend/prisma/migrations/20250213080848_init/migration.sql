/*
  Warnings:

  - Added the required column `url` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "url" TEXT NOT NULL;
