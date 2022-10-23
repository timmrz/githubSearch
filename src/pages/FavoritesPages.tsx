import React from 'react'
import { RepoCard } from '../components/RepoCard'
import { useAppSelector } from '../hooks/redux'

export function FavoritesPages() {

    const { favorites } = useAppSelector( state => state.github )

    if ( favorites.length === 0 ) return <p className='text-center mt-10'>No items...</p>

    return (
        <div className='flex justify-center mx-auto pt-10 h-screen w-screen w-[640px]'>
            <ul className='list-none w-full'>
                {favorites.map( item => (
                    <RepoCard repo={item} key={item.id} />
                ) )}
            </ul>

        </div>
    )
}