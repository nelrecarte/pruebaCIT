-- Users
INSERT INTO users (id_user, name, email, password) VALUES
(1, 'Alice Johnson', 'alice@example.com', 'hashedpassword1'),
(2, 'Bob Martinez', 'bob@example.com', 'hashedpassword2'),
(3, 'Carol Lee', 'carol@example.com', 'hashedpassword3');

-- Categories
INSERT INTO categories (id_category, name) VALUES
(1, 'Deportes'),
(2, 'Recreation'),
(3, 'Meeting'),
(4, 'BBQ Zone'),
(5, 'Events');

-- Areas
INSERT INTO areas (id_area, name, description, id_category) VALUES
(1, 'Tennis Court A', 'Outdoor clay court', 1),
(2, 'Soccer Field', 'Synthetic grass, full size', 1),
(3, 'Game Room', 'Board games and ping pong', 2),
(4, 'Gym', 'Cardio and weight machines', 2),
(5, 'Conference Room A', '10-person capacity, A/V ready', 3),
(6, 'Conference Room B', 'Private team space', 3),
(7, 'BBQ Area 1', 'Grill and picnic table', 4),
(8, 'BBQ Area 2', 'Covered grill area', 4),
(9, 'Event Hall A', 'Large events and parties', 5),
(10, 'Outdoor Amphitheater', 'For performances and gatherings', 5);
