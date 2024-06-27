
import dao from "../data/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";
const { users } = dao;


class UsersRepository{

    constructor(manager){
        this.manager = manager
    }

    createRepository= async (data)=>{
        try {
            data= new UsersDTO(data)
            const one = await this.manager.create(data);
            return one
        } catch (error) {
            throw error
        }
   }

   readRepository =async (role)=>{
    try {
        const all = await this.manager.read(role);
        return all
    } catch (error) {
        throw error
    }
}

readOneRepository =async (uid)=>{
    try {
        const one = await this.manager.readOne(uid);
        return one
    } catch (error) {
        throw error
    }
}

paginateRepository =async ({ filter, opts })=>{
    try {
        const all = await this.manager.paginate({ filter, opts });
        return all
    } catch (error) {
        throw error
    }
}

updateRepository =async (uid,data)=>{
    try {
        const one = await this.manager.update(uid,data);
        return one
    } catch (error) {
        throw error
    }
}

destroyRepository =async (uid)=>{
    try {
        const one = await this.manager.destroy(uid);
        return one
    } catch (error) {
        throw error
    }
}
}



const userRepository = new UsersRepository(users);
export default userRepository;
