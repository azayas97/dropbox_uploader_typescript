import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcryptjs';

/**
 * Entity class that defines the User object in the database.
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, length: 40 })
    email: string

    @Column({ length: 30})
    first_name: string

    @Column({ length: 30})
    last_name: string

    @Column({ length: 60 })
    password: string

    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 12);
    }
}
