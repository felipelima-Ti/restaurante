/*
  Warnings:

  - You are about to drop the column `productName` on the `Order` table. All the data in the column will be lost.
  - Added the required column `productName` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productName";

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN "productName" TEXT NOT NULL DEFAULT 'Produto genérico';