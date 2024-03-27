exports.up = (pgm) => {
    pgm.createTable('users', {
        user_id: {
            type: 'serial',
            primaryKey: true,
            notNull: true
        },
        first_name: {
            type: 'varchar(100)',
            notNull: true
        },
        last_name: {
            type: 'varchar(100)',
            notNull: true
        },
        email: {
            type: 'varchar(255)',
            notNull: true
        },
        password: {
            type: 'varchar(255)',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        permission_level: {
            type: 'varchar(100)',
            notNull: false
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};