import {
    Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

/**
 * Entity class that defines the Log object in the database.
 */
@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    timestamp: string

    @Column()
    filename: string

    @Column({ length: 40 })
    user: string

    @Column({ length: 10 })
    type: string

    @Column()
    message: string
}
