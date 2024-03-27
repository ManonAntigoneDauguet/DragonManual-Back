// This code allow you to fill the database once the migration is realized
// Check the README at the 1.2 section

const { Client } = require('pg');

require('dotenv').config()

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

client.connect()
    .then(() => fillSpeciesDb())
    .catch(err => console.error('Database connection error', err.stack));

async function fillSpeciesDb() {
    try {
        const query =
            `
                INSERT INTO species(specie_id, name, classification1, classification2, mount, fly, marine, rare, difficulty, sociability, petfriendly, class, original, traveler, sedentary, needwater, breath1, breath2, breath_description, dragon_predator, description)
                VALUES 
                (1, 'Cauchemar Monstrueux', 'Flamme', NULL, true, true, false, 1, 2, 4, 3, true, false, true, true, 1, 'fire', NULL, NULL, false, 'Grand dragon se recouvrant de flamme lorsqu’il est en colère. Têtu et puissant, il a beau être très sociable avec les autres dragons il n’en pas moins un relatif défi pour un dragonnier. Pour autant il peut très bien être dressé à cohabiter avec d’autres espèces.'),
                (2, 'Gronk', 'Roche', NULL, true, true, false, 1, 1, 4, 3, false, true, true, true, 1, 'fire', NULL, 'lava', false, 'Avec un look aussi trapu que farfelu, ce dragon un peu paresseux se montre très sociable avec toutes les espèces et très affectueux avec son dresseur et les amis de son dresseur. Pour autant, un dragonnier de gronk est férocement protégé par son compagnon.'),
                (3, 'Dragon Vipère', 'Lame', 'Traque', true, true, false, 1, 1, 4, 3, true, false, true, false, 1, 'fire', NULL, NULL, false, 'Vif et agile tant au vol que sur terre, le dragon vipère est aussi fier qu’il est joueur. Assez commun, très sociable, il fait aussi partie des dragons les plus colorés qui soit.'),
                (4, 'Furie Nocturne', 'Ouragan', NULL, true, true, false, 3, 3, 4, 3, true, false, true, false, 1, 'fire', NULL, 'explosion', false, 'Méfiant et intelligent, il n’en pas moins de nature sociale et curieuse. C’est également un expert en vol acrobatique. Le furie nocturne se démarque par son improbable bouille de dragon axolotl, et c’est aussi un des dragons les plus rares qui soit.'),
                (5, 'Terreur Terrible', 'Flamme', NULL, false, true, false, 1, 1, 4, 3, false, false, true, true, 1, 'fire', NULL, NULL, false, 'Petit et espiègle, le terreur terrible vit en grande famille, elle-même souvent insérée dans des ruches réunissant de multiples espèces. Doux et intelligent, on peut lui apprendre de nombreux tours.'),
                (6, 'Hideux Braguettaure', 'Mystère', NULL, true, true, false, 1, 1, 4, 3, false, true, true, true, 1, 'fire', 'gaz', 'explosion', false, 'Une des très rares espèces à plusieurs têtes, il possède deux personnalités, plus ou moins complices, chacune aussi impatiente de se lier à un dragonnier. Bien que peu intelligent, le hideux braguettaure a un grand sens de l’honneur et est attentif à son dresseur.'),
                (7, 'Ébouillantueur', 'Onde', NULL, true, true, true, 1, 3, 1, 1, true, false, true, false, 3, 'water', NULL, 'boiling water', true, 'Presque impossible à dresser, ce géant des mers inscrit autant les vikings que d’autres espèces de dragons à son menu. Il se reconnait à sa tête portée par un long cou serpentin, et à son souffle d’eau bouillante.'),
                (8, 'Horreur des Mers', 'Onde', NULL, true, false, true, 2, 2, 4, 3, true, true, true, false, 4, 'lightning', NULL, NULL, false, 'Très reconnaissable à sa silhouette de raie géante, ce marin chasse les poissons et se défend de ses prédateurs grâce au courant d’’électricité qu’il génère entre ses deux têtes. Il lui arrive en chasse en banc.’),
                (9, 'Mille Tonnerres', 'Onde', NULL, true, true, true, 1, 1, 3, 3, false, true, true, true, 2, 'sound', 'fire', NULL, false, 'Bien qu’assez solitaire à l’état sauvage, le mille tonnerres protège vaillamment ceux qu’il assimile à son groupe. Il peut ouvrir une bouche titanesque pour émettre une explosion sonique. De fait il est presque sourd’),
                (10, 'Vélocidard', 'Lame', NULL, true, false, false, 2, 3, 2, 2, true, false, true, false, 1, 'acid', NULL, NULL, false, 'Bien que dragon de meute et de nature très intelligente, le vélocidard est dangereux et très difficile à dresser, et peu disposé à cohabiter avec d’autres espèces de dragons et d’animaux en général. Incapable de voler, il est sur la terre ferme le dragon le plus rapide qui soit.'),
                (11, 'Verenflamme', 'Flamme', NULL, false, false, false, 1, 1, 3, 3, false, true, true, true, 1, 'fire', NULL, NULL, false, 'Le plus petit des dragons, vivant en grands groupes très organisés. Leur peau peut atteindre de fortes températures, et plus d’individus de la même espèce se regroupent, plus leur peau brille.'),
                (41, 'Éclair Nocturne', 'Ouragan', NULL, true, true, false, 3, 2, 4, 3, true, false, true, false, 1, 'fire', NULL, 'explosion', false, 'Croisement de furie nocturne et de furie éclair, parfois observé dans la nature. Aussi rapides et élégants que leurs deux parents, ils se montrent cependant moins méfiants et plus simples à dresser.'),
                (42, 'Reine des Verenflammes', 'Flamme', NULL, true, true, false, 3, 2, 4, 3, true, true, true, true, 1, 'fire', NULL, NULL, false, 'Femelle des verenflammes, grande et puissante, attentive à la sécurité de sa progéniture, et autour de laquelle la ruche s’organise. Son venin a la particularité de restaurer l’énergie vitale de certains dragons.'),
                (63, 'Spectrosable', 'Onde', NULL, true, true, true, 3, 3, 2, 3, true, false, true, true, 0, 'sand', NULL, NULL, false, 'Ce marin de taille moyenne se distingue par son masque noir et sa large envergure parée d’épines. De nature solitaire c’est aussi un dragon assez rare que l’on a que très peu l’occasion d’observer.'),
                (67, 'Ice Beast', 'Onde', NULL, true, false, true, 3, 3, 4, 3, true, true, true, true, 4, 'water', NULL, 'ice', false, 'Aussi appelé « Roi des dragons », cette titanesque espèce marine est prédisposée à être alpha, exerçant son pouvoir d’hypnotisme pour guider les multiples espèces qui le suivent. Il construit son nid via son puissant souffle de glace.'),
                (68, 'Hurlement Laineux', 'Ouragan', NULL, true, true, false, 3, 3, 1, 1, true, true, true, true, 1, 'water', NULL, 'ice', false, 'Espèce peu connue, de nature discrète mais territoriale. Son apparente fourrure est en fait une crinière d’écailles coupantes. Lorsque l’on s’approche de ses montagnes il attaque à distance, caché dans le blizzard, en lançant des explosions de gel.'),
                (70, 'Furie Éclair', 'Ouragan', NULL, true, true, false, 2, 3, 3, 3, false, true, true, false, 1, 'fire', NULL, 'explosion', false, 'Dragon lisse et blanc filant dans le ciel à toute vitesse. Méfiant et nerveux, en observer un relève du vrai défi. Ils sont connus pour disparaître instantanément derrière l’explosion de leur propre souffle lorsqu’ils s’enfuient.'),
                (74, 'Luminous Krayfin', 'Onde', NULL, true, false, true, 3, 1, 3, 3, true, true, true, true, 4, 'flash of light', NULL, NULL, false, 'Gigantesque dragon marin rappelant une immense tortue. Il est paisible et très sociable, se dresse facilement et s’entend parfaitement avec les autres espèces de dragons ainsi qu’avec d’autres animaux.'),
                (75, 'Mort Violette', 'Onde', NULL, true, false, true, 3, 3, 1, 1, true, true, true, true, 4, 'fire', NULL, NULL, false, 'Dragon de légende, sommeillant dans les abysses marines. Il peut créer des vagues dignes des plus grandes tempêtes par le déplacement de son corps. La puissance de ses flammes peut engouffrer des villages.');
            `;
        await client.query(query);
        console.log("The species db is successfully filled");
    } catch (error) {
        console.log("The species db is already filled");
    }
    process.exit();
}
