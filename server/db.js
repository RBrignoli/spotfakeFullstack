import Sequelize from 'sequelize'

const sequelize = new Sequelize(
    'spotfake',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)
const User = sequelize.define('user', {
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNasc: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'inativo'
    },
    profile_image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    }
})

const Artista = sequelize.define('artista', {
    nome: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type:Sequelize.DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'artists',
});

const Album = sequelize.define('album', {
    title: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    releaseYear: {
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    coverImageUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'albums',
});

const Musica = sequelize.define('musica', {
    titulo: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    duracao: {
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    fileUrl: {
        type:Sequelize.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'musicas',
});

//relacionamentos

Album.belongsTo(Artista, {
    foreignKey: 'artista_id',
    onDelete: 'CASCADE',
});
Album.hasMany(Musica, {
    foreignKey: 'album_id',
    as: 'Musicas',
});
Artista.hasMany(Album, {
    foreignKey: 'artista_id',
    as: 'Albums',
});
Musica.belongsTo(Album, {
    foreignKey: 'album_id',
    onDelete: 'CASCADE',
});
Musica.belongsTo(Artista, {
    foreignKey: 'artista_id',
    onDelete: 'CASCADE',
});

const criarTabelas = () => {
    sequelize.authenticate().then(() => {
        console.log('conectou')
    })
        .catch((err) => {
            console.log(err)
        })
    sequelize.sync({ force: true }).then(() => {
        console.log('tabela criada')
    })
}

export { User, sequelize, criarTabelas, Artista, Album, Musica };