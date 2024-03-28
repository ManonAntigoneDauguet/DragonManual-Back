exports.up = (pgm) => {
    pgm.createTable('authenticationtoken', {
        value: {
            type: 'varchar(255)',
            notNull: true
        },
        user_id: {
            type: 'integer',
            notNull: true,
            references: 'users(user_id)',
            onDelete: 'cascade'
        },
        created_at: {
            type: 'timestamp',
            notNull: true
        },
        expiry: {
            type: 'varchar(100)',
            notNull: true
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('authenticationtoken');
};