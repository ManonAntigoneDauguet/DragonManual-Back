exports.up = (pgm) => {
    pgm.createTable('dragoncharacters', {
        dragon_id: {
            type: 'serial',
            primaryKey: true,
            notNull: true
        },
        name: {
            type: 'varchar(100)',
            notNull: false
        },
        rider_id: {
            type: 'integer',
            notNull: false,
            references: 'users(user_id)',
            onDelete: 'cascade'
        },
        specie_id: {
            type: 'integer',
            notNull: false,
            references: 'species(specie_id)',
            onDelete: 'cascade'
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('dragoncharacters');
};