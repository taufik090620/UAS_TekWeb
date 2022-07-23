CREATE TABLE "users" (
  "id" VARCHAR(36) PRIMARY KEY,
  "username" varchar(50),
  "password" varchar(100),
  "name" varchar(50),
  "email" varchar(50),
  "birth_date" TIMESTAMPTZ,
  "birth_place" varchar(100),
  "address" text,
  "phone_number" varchar(20),
  "created_date" TIMESTAMPTZ,
  "updated_date" TIMESTAMPTZ
);

CREATE TABLE "sub_organizations" (
  "id" VARCHAR(36) PRIMARY KEY,
  "name" varchar(50),
  "description" text,
  "address" text,
  "created_by" varchar(50),
  "updated_by" varchar(50),
  "created_date" TIMESTAMPTZ,
  "updated_date" TIMESTAMPTZ
);

CREATE TABLE "member_sub_organization" (
  "id" VARCHAR(36) PRIMARY KEY,
  "sub_organization_id" VARCHAR(36),
  "user_id" VARCHAR(36),
  "created_by" varchar(50),
  "updated_by" varchar(50),
  "created_date" TIMESTAMPTZ,
  "updated_date" TIMESTAMPTZ
);

CREATE TABLE "activity" (
  "id" VARCHAR(36) PRIMARY KEY,
  "sub_organization_id" VARCHAR(36),
  "name" varchar(50),
  "description" text,
  "pic" VARCHAR(36),
  "created_by" varchar(50),
  "updated_by" varchar(50),
  "created_date" TIMESTAMPTZ,
  "updated_date" TIMESTAMPTZ
);

CREATE TABLE "role_activity" (
  "id" VARCHAR(36) PRIMARY KEY,
  "activity_id" VARCHAR(36),
  "pic" VARCHAR(36),
  "name" varchar(50),
  "description" text
);


ALTER TABLE "member_sub_organization" ADD FOREIGN KEY ("sub_organization_id") REFERENCES "sub_organizations" ("id");

ALTER TABLE "member_sub_organization" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "activity" ADD FOREIGN KEY ("sub_organization_id") REFERENCES "sub_organizations" ("id");

ALTER TABLE "activity" ADD FOREIGN KEY ("pic") REFERENCES "users" ("id");

ALTER TABLE "role_activity" ADD FOREIGN KEY ("activity_id") REFERENCES "activity" ("id");

ALTER TABLE "role_activity" ADD FOREIGN KEY ("pic") REFERENCES "users" ("id");
