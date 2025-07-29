-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerCartao" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "customerCartao" DROP NOT NULL;
