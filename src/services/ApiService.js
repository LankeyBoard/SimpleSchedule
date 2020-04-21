import Axios from 'axios'
export class ApiService
{
    static async LogIn(userid, password) {
        try {
            const ApiResponse = await Axios.post('/api/users/authenticate', { userid, password }) 
            return {
                data: ApiResponse.data,
                status: ApiResponse.status,
            }
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data
            }
        }
    }
}