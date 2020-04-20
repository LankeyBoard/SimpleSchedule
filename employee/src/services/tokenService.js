export default class tokenService
{
    static retrieveTokenData(token)
    {
        try {
            const _userData = JSON.parse(atob(token.split(".")[1])).user
            return _userData
        } catch (error) {
            throw error
        }
    }
}