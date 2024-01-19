
import { Column, DataType, PrimaryKey, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;
}
