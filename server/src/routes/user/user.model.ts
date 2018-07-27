import Model from '../../shared/repositories/entities/model.entity';
import UserEntity from '../../shared/repositories/entities/user.entity';

export default class User extends Model {
    public id: number;

    public firstname: string;
    public lastname: string;
    public username: string; // @ symbol
    public password: string;
    public email: string;
    public avatar: string;

    constructor(user?: UserEntity) {
        super();

        if (user instanceof UserEntity) {
            this.id = user.u_id || - 1;
            this.firstname = user.u_firstname || "";
            this.lastname = user.u_lastname || "";
            this.username = user.u_username || "";
            this.password = user.u_password || "";
            this.email = user.u_email || "";
            this.avatar = user.u_avatar || "";
        }
    }
}