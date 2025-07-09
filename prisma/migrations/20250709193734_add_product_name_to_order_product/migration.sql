/*
  Warnings:

  - You are about to drop the column `productName` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productName" TEXT NOT NULL DEFAULT 'Produto genérico';

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "productName";
