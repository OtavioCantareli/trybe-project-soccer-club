import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Teams;
