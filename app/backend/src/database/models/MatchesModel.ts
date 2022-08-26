import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    homeTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    awayTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das inst창ncias de modelo
 * */

Matches.belongsTo(Teams, { as: 'teamHome', foreignKey: 'home_team' });
Matches.belongsTo(Teams, { as: 'teamAway', foreignKey: 'away_team' });

Teams.hasMany(Matches, { as: 'teamHome', foreignKey: 'id' });
Teams.hasMany(Matches, { as: 'teamAway', foreignKey: 'id' });

export default Matches;
