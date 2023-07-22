import { Table } from 'flowbite-react'
import User from '../../interfaces/user'
import moment from 'moment'
import userAPI from '../../requests/user'

interface PropsTypes {
    user: User
    admins: User[],
    setAdmins: React.Dispatch<React.SetStateAction<User[]>>
}

function AdminRow({ user, admins, setAdmins }: PropsTypes) {

    function removeAdmin() {
        const response = userAPI.addAdmin(user.Id, 0)

        response.then((response) => {

            if (response.message === 'Admin status updated') {
                let data = admins.filter((admin) => admin.Id !== user.Id)
                setAdmins(data)

            } else {
                alert(response.message)
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Table.Row className={`dark:border-gray-700 dark:bg-gray-800`}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>
                    {user.Username}
                </p>
            </Table.Cell>

            <Table.Cell>
                {user.Email}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {moment(user.createdAt).format('DD/MM/YYYY')}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <button className='flex items-center bg-red rounded-lg p-2 gap-2 px-4 duration-300 hover:opacity-50 text-white font-bold' onClick={e => removeAdmin()}>Remove</button>
            </Table.Cell>

        </Table.Row>
    )
}

export default AdminRow