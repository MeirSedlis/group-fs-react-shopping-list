-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "shoppingList" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"quantity" DECIMAL NOT NULL,
	"unit" VARCHAR (20),
	"purchased" BOOLEAN DEFAULT FALSE);

INSERT INTO "shoppingList" 
    ("name", "quantity", "unit")
    VALUES
    ('tacos', 5, 'each');
    
  