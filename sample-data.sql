-- Sample Data for MuseMate
-- Run this after creating the schema to populate with test data

-- Insert sample museums
INSERT INTO museums (id, name, city, description, theme, official_page) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'The Metropolitan Museum of Art', 'New York', 'One of the world''s largest and most comprehensive art museums', 'Art', 'https://www.metmuseum.org'),
('550e8400-e29b-41d4-a716-446655440002', 'Museum of Natural History', 'New York', 'Explore the natural world through specimens, exhibits, and interactive displays', 'Natural History', 'https://www.amnh.org'),
('550e8400-e29b-41d4-a716-446655440003', 'The Louvre', 'Paris', 'The world''s most-visited museum and a historic monument in Paris', 'Art', 'https://www.louvre.fr');

-- Insert sections for The Met
INSERT INTO sections (id, museum_id, name, floor, description) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'Egyptian Art', 1, 'Ancient Egyptian artifacts and mummies'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 'European Paintings', 2, 'Renaissance and Baroque masterpieces'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440001', 'Arms and Armor', 1, 'Medieval and Renaissance weapons and armor'),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440001', 'Greek and Roman Art', 1, 'Classical antiquities from Greece and Rome');

-- Insert sections for Natural History Museum
INSERT INTO sections (id, museum_id, name, floor, description) VALUES
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Dinosaur Exhibits', 4, 'Fossils and reconstructions of prehistoric creatures'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440002', 'Hall of Ocean Life', 1, 'Marine life displays and the famous blue whale'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440002', 'Planetarium', 2, 'Space and astronomy exhibits'),
('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440002', 'Mineral Hall', 1, 'Gems, minerals, and meteorites');

-- Insert sections for The Louvre
INSERT INTO sections (id, museum_id, name, floor, description) VALUES
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440003', 'Mona Lisa Gallery', 1, 'Home to Leonardo da Vinci''s famous masterpiece'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440003', 'Venus de Milo', 0, 'Ancient Greek and Roman sculptures'),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440003', 'Egyptian Antiquities', 0, 'Ancient Egyptian artifacts and art'),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440003', 'French Paintings', 2, 'Works by French masters');

-- Insert key objects for The Met - Egyptian Art
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440011', 'Temple of Dendur', 'Complete Roman-era temple relocated from Egypt', null),
('550e8400-e29b-41d4-a716-446655440011', 'Mummy of Wenuhotep', 'Well-preserved mummy from the Middle Kingdom', null),
('550e8400-e29b-41d4-a716-446655440011', 'Canopic Jars', 'Vessels used to store organs during mummification', null);

-- Insert key objects for The Met - European Paintings
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440012', 'View of Toledo by El Greco', 'Dramatic landscape painting of the Spanish city', null),
('550e8400-e29b-41d4-a716-446655440012', 'Young Woman with a Water Pitcher by Vermeer', 'Masterpiece of Dutch Golden Age painting', null),
('550e8400-e29b-41d4-a716-446655440012', 'The Death of Socrates by Jacques-Louis David', 'Neoclassical painting depicting the philosopher''s final moments', null);

-- Insert key objects for Natural History - Dinosaurs
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440021', 'Tyrannosaurus Rex Skeleton', 'One of the most complete T-Rex specimens ever found', null),
('550e8400-e29b-41d4-a716-446655440021', 'Triceratops Skull', 'Massive three-horned dinosaur skull', null),
('550e8400-e29b-41d4-a716-446655440021', 'Apatosaurus Skeleton', 'Long-necked herbivorous dinosaur', null);

-- Insert key objects for Natural History - Ocean Life
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440022', 'Blue Whale Model', 'Life-size model of the largest animal on Earth', null),
('550e8400-e29b-41d4-a716-446655440022', 'Giant Squid Specimen', 'Rare preserved specimen of the deep-sea creature', null),
('550e8400-e29b-41d4-a716-446655440022', 'Coral Reef Diorama', 'Detailed recreation of a tropical coral reef ecosystem', null);

-- Insert key objects for The Louvre - Mona Lisa Gallery
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440031', 'Mona Lisa', 'Leonardo da Vinci''s enigmatic portrait', null),
('550e8400-e29b-41d4-a716-446655440031', 'The Wedding at Cana', 'Massive painting by Paolo Veronese', null);

-- Insert key objects for The Louvre - Venus de Milo
INSERT INTO key_objects (section_id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440032', 'Venus de Milo', 'Ancient Greek sculpture of the goddess Aphrodite', null),
('550e8400-e29b-41d4-a716-446655440032', 'Winged Victory of Samothrace', 'Hellenistic sculpture of Nike', null),
('550e8400-e29b-41d4-a716-446655440032', 'The Three Graces', 'Roman marble sculpture group', null);