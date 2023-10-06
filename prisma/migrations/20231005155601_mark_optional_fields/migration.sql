-- DropForeignKey
ALTER TABLE "AutomationExecutions" DROP CONSTRAINT "AutomationExecutions_json_transform_id_fkey";

-- AlterTable
ALTER TABLE "AutomationExecutions" ALTER COLUMN "json_transform_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_json_transform_id_fkey" FOREIGN KEY ("json_transform_id") REFERENCES "JsonTransforms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
