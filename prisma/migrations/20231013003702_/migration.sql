-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "AutomationApp" AS ENUM ('SCRAPE_LINKEDIN_PROFILE_SEARCH', 'ENRICH_LINKEDIN_PROFILES');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessCode" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AccessCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationExecutions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "automation_app_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "json_transform_id" INTEGER,

    CONSTRAINT "AutomationExecutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationApps" (
    "id" SERIAL NOT NULL,
    "type" "AutomationApp" NOT NULL,
    "input_schema" TEXT,
    "output_schema" TEXT,

    CONSTRAINT "AutomationApps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JsonTransforms" (
    "id" SERIAL NOT NULL,
    "mapper" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "JsonTransforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationSchedule" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "chain_links" TEXT NOT NULL,
    "schedule_config" TEXT NOT NULL,

    CONSTRAINT "AutomationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_automation_app_id_fkey" FOREIGN KEY ("automation_app_id") REFERENCES "AutomationApps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_json_transform_id_fkey" FOREIGN KEY ("json_transform_id") REFERENCES "JsonTransforms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationExecutions" ADD CONSTRAINT "AutomationExecutions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonTransforms" ADD CONSTRAINT "JsonTransforms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationSchedule" ADD CONSTRAINT "AutomationSchedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
