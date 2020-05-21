CREATE TABLE todo (
  id SERIAL,
  title TEXT,
  "order" INTEGER, -- in quotes because 'order' is a reserved sql keyword
  completed BOOLEAN DEFAULT false
);
