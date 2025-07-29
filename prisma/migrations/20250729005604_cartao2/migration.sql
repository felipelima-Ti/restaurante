/*
  Warnings:

  - The `customerCartao` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `customerCartao` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerCartao",
ADD COLUMN     "customerCartao" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customerCartao",
ADD COLUMN     "customerCartao" INTEGER;
