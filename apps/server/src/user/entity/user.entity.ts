import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ unique: true })
  email: string;

  // 隐藏此列，不做为查询返回值{ select: false }
  @Column()
  password: string;

  // name定义表中的命名
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async insert() {
    this.email = this.email.toLowerCase();
    if (!this.password) return;
    console.log('encryptPwd');
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
