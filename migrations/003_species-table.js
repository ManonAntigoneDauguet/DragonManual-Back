exports.up = (pgm) => {
    pgm.createTable('species', {
        specie_id: {
            type: 'serial',
            primaryKey: true,
            notNull: true
        },
        name: {
            type: 'varchar(100)',
            notNull: false
        },
        classification1: {
            type: 'varchar(100)',
            notNull: false
        },
        classification2: {
            type: 'varchar(100)',
            notNull: false
        },
        mount: {
            type: 'boolean',
            notNull: true
        },
        fly: {
            type: 'boolean',
            notNull: true
        },
        marine: {
            type: 'boolean',
            notNull: true
        },
        rare: {
            type: 'integer',
            notNull: true
        },
        difficulty: {
            type: 'integer',
            notNull: true
        },
        sociability: {
            type: 'integer',
            notNull: true
        },
        petfriendly: {
            type: 'integer',
            notNull: true
        },
        class: {
            type: 'boolean',
            notNull: true
        },
        original: {
            type: 'boolean',
            notNull: true
        },
        traveler: {
            type: 'boolean',
            notNull: true
        },
        sedentary: {
            type: 'boolean',
            notNull: true
        },
        needwater: {
            type: 'integer',
            notNull: true
        },
        breath1: {
            type: 'varchar(128)',
            notNull: true
        },
        breath2: {
            type: 'varchar(128)',
            notNull: false
        },
        breath_description: {
            type: 'varchar(255)',
            notNull: false
        },
        dragon_predator: {
            type: 'boolean',
            notNull: true
        },
        description: {
            type: 'text',
            notNull: false
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('species');
};