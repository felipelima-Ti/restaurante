-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "productName" TEXT NOT NULL DEFAULT 'Produto genérico';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerCpf" TEXT NOT NULL,
    "customerEndereco" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
