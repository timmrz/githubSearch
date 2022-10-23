import React, { useState, useEffect } from 'react'
import { RepoCard } from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

export function HomePage() {
    const [search, setSearch] = useState( '' )
    const debounced = useDebounce( search )
    const [dropdownVisible, setDropdownVisible] = useState( false )
    const { isError, isLoading, data } = useSearchUsersQuery( debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    } )

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    useEffect( () => {
        setDropdownVisible( debounced.length > 3 && data?.length! > 0 )
    }, [debounced, data] )

    const handleClick = ( username: string ) => {
        fetchRepos( username )
        setDropdownVisible( false )
    }



    return (
        <div className='flex justify-center mx-auto pt-10 h-screen w-screen '>
            {isError && <p className='text-center text-red-600'> Something went wrong...</p>}
            <div className='relative w-[640px]'>
                <input
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    type="text"
                    placeholder='Search for Github username...'
                    value={search}
                    onChange={e => setSearch( e.target.value )} />

                <ul className='list-none absolute left-0 right-0 top-[42px] max-h-[200px] shadow-md bg-white overflow-y-auto'>
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {dropdownVisible && data?.map( ( user ) => (
                        <li
                            key={user.id}
                            onClick={() => handleClick( user.login )}
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
                            {user.login}
                        </li>
                    ) )}
                </ul>

                <div className="container">
                    {areReposLoading && <p className='text-center'>Repos are loading...</p>}
                    {repos?.map( repo => ( <RepoCard repo={repo} key={repo.id} /> ) )}
                </div>
            </div>

        </div>
    )
}