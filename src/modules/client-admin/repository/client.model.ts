import { PrimaryKey, Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare address: string;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare name: string;
}
