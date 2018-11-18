import delay from './delay';

class UserApi {
    static loadUser(userId) {
        return new Promise(resolve => {
            setTimeout(() => {
                const user = require('../resources/fixtures/user-' + userId.toLowerCase() + '.json');
                resolve(user);
                // resolve(Object.assign([], courses));
            }, delay);
        });
    }
}

export default UserApi;
