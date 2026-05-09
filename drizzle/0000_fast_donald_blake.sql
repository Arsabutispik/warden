CREATE TABLE "guilds" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"prefix" text DEFAULT '!' NOT NULL,
	"language" text DEFAULT 'en' NOT NULL
);
