import { PrimaryKey, Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare salesPrice: number;

  @Column({ allowNull: false })
  declare name: string;
}
