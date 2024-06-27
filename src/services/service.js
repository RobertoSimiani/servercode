

class Service{

    constructor(repository){
        this.repository = repository
    }

    createService= async (data)=>{
        try {
            const one = await this.manager.createRepository(data);
            return one
        } catch (error) {
            throw error
        }
   }

   readService =async (role)=>{
    try {
        const all = await this.manager.readRepository(role);
        return all
    } catch (error) {
        throw error
    }
}

readOneService =async (uid)=>{
    try {
        const one = await this.manager.readOneRepository(uid);
        return one
    } catch (error) {
        throw error
    }
}

paginateService =async ({ filter, opts })=>{
    try {
        const all = await this.manager.paginateRepository({ filter, opts });
        return all
    } catch (error) {
        throw error
    }
}

updateService =async (uid,data)=>{
    try {
        const one = await this.manager.updateRepository(uid,data);
        return one
    } catch (error) {
        throw error
    }
}

destroyService =async (uid)=>{
    try {
        const one = await this.manager.destroyRepository(uid);
        return one
    } catch (error) {
        throw error
    }
}
}

export default Service