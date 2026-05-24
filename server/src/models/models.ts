import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CartGame = sequelize.define('cart_game', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Game = sequelize.define('game', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const SystemRequirements = sequelize.define('system_requirements', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    os: { type: DataTypes.STRING, allowNull: false },
    processor: { type: DataTypes.STRING, allowNull: false },
    graphics: { type: DataTypes.STRING, allowNull: false },
    storage: { type: DataTypes.STRING, allowNull: false },
    memory_RAM: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Genre = sequelize.define('genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const GameCategories = sequelize.define('game_categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const GameGenres = sequelize.define('game_genres', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.belongsToMany(Game, { through: CartGame });
Game.belongsToMany(Cart, { through: CartGame });

Game.hasOne(SystemRequirements, { foreignKey: 'game_id', as: 'sysreqs' });
SystemRequirements.belongsTo(Game, { foreignKey: 'game_id' });

Game.belongsToMany(Category, { through: GameCategories });
Category.belongsToMany(Game, { through: GameCategories });

Game.belongsToMany(Genre, { through: GameGenres });
Genre.belongsToMany(Game, { through: GameGenres });

export { Cart, CartGame, Category, Game, GameCategories, GameGenres, Genre, SystemRequirements, User };
