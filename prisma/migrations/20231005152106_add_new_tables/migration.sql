-- CreateEnum
CREATE TYPE "AutomationApp" AS ENUM ('SCRAPE_LINKEDIN_PROFILE_SEARCH', 'ENRICH_LINKEDIN_PROFILES');

-- CreateTable
CREATE TABLE "AutomationExecutions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "automation_app_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "json_transform_id" INTEGER NOT NULL,

    CONSTRAINT "AutomationExecutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationApps" (
    "id" SERIAL NOT NULL,
    "type" "AutomationApp" NOT NULL,

    CONSTRAINT "AutomationApps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JsonTransforms" (
    "id" SERIAL NOT NULL,
    "mapper" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "JsonTransforms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_automation_app_id_fkey" FOREIGN KEY ("automation_app_id") REFERENCES "AutomationApps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_json_transform_id_fkey" FOREIGN KEY ("json_transform_id") REFERENCES "JsonTransforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonTransforms" ADD CONSTRAINT "JsonTransforms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
