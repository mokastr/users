import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'
import { useEffect, useState } from 'react'

// список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = useState([])
	const [invites, setInvites] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [success, setSuccess] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		fetch('https://reqres.in/api/users')
			.then(res => res.json())
			.then(json => {
				setUsers(json.data)
			})
			.catch(err => console.warn(err))
			.finally(() => setIsLoading(false))
	}, [])

	const onChangeSearchValue = event => setSearchValue(event.target.value)

	const onClickInvite = id => {
		if (invites.includes(id)) {
			setInvites(prev => {
				return prev.filter(_id => _id !== id)
			})
		} else {
			setInvites(prev => {
				return [...prev, id]
			})
		}
	}

	const onClickSendInvited = () => setSuccess(true)

	return success ? (
		<Success count={invites.length} />
	) : (
		<div className="App">
			<Users
				items={users}
				isLoading={isLoading}
				onChangeSearchValue={onChangeSearchValue}
				searchValue={searchValue}
				invites={invites}
				onClickInvite={onClickInvite}
				onClickSendInvited={onClickSendInvited}
			/>
		</div>
	)
}
export default App
