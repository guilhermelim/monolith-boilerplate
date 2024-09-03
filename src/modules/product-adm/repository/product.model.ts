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
  declare purchasePrice: number;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare updatedAt: Date;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare stock: number;

  @Column({ allowNull: false })
  declare name: string;
}
