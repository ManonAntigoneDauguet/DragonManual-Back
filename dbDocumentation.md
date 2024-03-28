# Db documentation

This project use a database with several table.
Here, more informations are done for each table and the general functioning of the database.
_ Remarque _ : by default the columns can't be null.

---


# Table of contentes

1. [Db schema](#1-db-schema)
2. [Users table](#2-users-table)
3. [Authenticationtoken table](#3-authenticationtoken-table)
4. [Dragoncharacters table](#4-dragoncharacters-table)
5. [Species table](#5-species-table)

---


## 1. Db schema

The database schema is available at this link : [dbSchema](./dbSchema.png).

---


## 2. Users table

### 2.1 description

This table contains all the user already created.
With this table, a user can create, login and edit a profile.

### 2.2 columns

 - **user_id** : it's the primary key of the table, and it's unique.
 - **first_name**
 - **last_name**
 - **email**
 - **password** : it's a string crypted when the user profile is created.
 - **created_at** : it's a timestamp value created by default.
 - **permission_level** : it's a string value who will be useful later to constraints several request according users. For now it can be null, and the code that allows the profile creation set it "public" by default.

### 2.3 extra contraints

The **user_id** is used by the foreign key **user_id** of the authenticationtoken table.

---


## 3. Authenticationtoken table

### 3.1 description

This table contains all the token already created.
A token allow to know if a user is connected.
A connected user can view and edit his profile, and can create his dragon character.
After a time (1h for now), the token is invalid and the user have to login again.

### 3.2 columns

 - **value** : it's the code compared to the one given by the user to know if is connected.
 - **user_id**: corresponding a the user_id of the user who has created the token.
 - **created_at** : it's a timestamp value corresponding to the creation of the token and from which the **expiration** is calculated.
 - **expiry** : it's a Unix timestamp value calculated from the **expiry** value.

### 3.3 extra contraints

The **user_id** is a foreign key for the users table (**user_id**).
After a time (24h for now), the token is deleted from the table.

---


## 4. Dragoncharacters table

### 4.1 description

This table contains all the dragon characters already created.
A connected user can create, edit and delete his dragon.

### 4.2 columns

 - **dragon_id** : it's the primary key of the table, it's unique and _the only not null value of this table_.
 - **name**
 - **rider_name** : the user is free to choose the official name of the dragon's rider.
 - **rider_id** : the user can declare this dragon his own, and the **rider_id** is so his **user_id** according to the user table.
 - **specie** : the user is free to choose the official name of the dragon's specie.
 - **specie_id** : the user can declare this dragon as a specie of the species table, and the **specie_id** is so his **specie_id** according to the species table.
 - **descritpion**
 - **created_at** : it's a timestamp value created by default.

### 4.3 extra contraints

The **rider_id** is a foreign key for the users table (**user_id**).
The **specie_id** is a foreign key for the species table (**specie_id**).
After a time (1 day for now), a dragon character without **rider_id** is deleted from the table.

---


## 5. Species table

### 5.1 description

This table contains all the dragon species saved.
If you want to populate the database with the `npm run fill-db` command as sayed in the [README.md](./README.md), so the species belong to the Dreamworks universe.
With this table, a user can to have different informations about these species.
This table is, at the origin, created to a quiz allowing the user to know his perfect specie to adopt !

### 5.2 columns

String columns :
 - **specie_id** : it's the primary key of the table, and it's unique.
 - **name** : it can be null.
 - **classification1** : the category of the specie, and it can be null.
 If you have populated the database with the script, so it can be : 'Flamme', 'Ouragan', 'Onde', 'Roche', 'Mystère' or 'Lame'.
 - **classification2** : possibly the specie can to be associated at another category. It can be null.
 - **breath1** : it's the type of the main breath of the specie. 
 Usually 'fire', 'water', 'acid' or 'lightning'.
 - **breath2** : possibly the specie have another breath. It can be null.
 - **breath_description** : sometimes specified, mainly to add a subcategory 'ice' to a 'water' breath, or 'explosion' to 'fire'... It can be null.
 - **description** : it can be null.

Boolean columns :
 - **mount** : it's true if the specie is enouth big to be rided by a humain.
 - **fly** : it's true if the specie can fly.
 - **dragon_predator** : it's true if the specie eat other dragons.
 - **marine** : it's true if the specie is a good swimmer.
 If this value is true, often the specie is in the 'Onde' category.
 - **class** : it's true if the specie appearance is graceful and powerful.
 - **original** : it's true is the specie appearance deviates from the usual appearance of a dragon.
 - **traveler** : it's true for almost of the species. The rare species that cannot travel are strongly dependent on a precisely located nest, such as the 'sablokor' or the 'buffleroi'.
 - **sedentary** : it's true if the specie is adaptable to multiple activities, including napping, and false for a dragon of a very energetic nature with high sporting needs, such as 'furies'.

Integer columns :
 - **rare** : it's a value linked to rarity of the specie.
 '1' : common, which can be found almost everywhere, in almost every hive, appears regularly in films and series.
 '2' : uncommon, especially those from derivative games.
 '3' : rare, very rare and extinct, which we only come across once in series and films or almost.

 - **difficulty** : it's a value linked to train difficulty.
 '1' : easy
 '2' : intermediate
 '3' : high difficulty.

 - **sociability**: it's a value linked to the dragon's sociability with other species of dragons.
 '1' : very unsociable, typically predators of dragons, who should not or cannot live among others, such as the 'ébouillantueur' or the 'écrevasse'.  These species are easily a danger in a hive, and are unhappy in a hive.
 '2' : not very sociable, typically those who like to live isolated from hives, very shy or aggressive species, but which can be integrated into a small group without harming the safety of individuals, like the 'vélocidard' or the 'razolame'.  These species are uncomfortable in hives.
 '3' : sociable species, typically species found both alone and in groups, as the 'mille tonnerres'.
 '4' : very sociable species, which need to be surrounded to be happy, like 'gronks'.

 - **petfriendly** : it's a value linked to compatibility with other pets.
 '1' : species dangerous to other animals, typically very nervous dragons, which attack everything, such as the 'murmure mortel', or even large predators such as the 'ébouillantueur'.
 '2' : species that can be trained to welcome the company of an occasional animal.
 '3' : easily compatible species, either basic or through simple training, such as the 'furie noctune'.

 - **needwater** : it's a integer value linked to the water dependence of the species and mainly concerns marine dragons.
 '1' : low need.
 '2' : the dragon needs ponds and rivers to immerse itself in but not necessarily more.
 '3' : the dragon needs deep pools of water to live.
 '4' : dragon only evolves in an aquatic environment.

### 5.3 extra contraints

The **specie_id** is used by the foreign key **specie_id** of the authenticationtoken table.