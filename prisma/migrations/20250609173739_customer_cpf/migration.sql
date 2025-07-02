/*
  Warnings:

  - Added the required column `customerEndereco` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerEndereco" TEXT NOT NULL;
