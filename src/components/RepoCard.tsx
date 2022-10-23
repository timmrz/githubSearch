import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo, IRepoCardInfo } from '../models/models'


export function RepoCard( { repo }: { repo: IRepo | IRepoCardInfo } ) {



    const { addFavorite, removeFavorite } = useActions()

    const { favorites } = useAppSelector( state => state.github )

    const [isFavorite, setIsFavorite] = useState( favorites.some( item => item.html_url === repo.html_url ) )


    const repoInfo: IRepoCardInfo = {
        html_url: repo.html_url,
        full_name: repo.full_name,
        id: repo.id,
        forks: repo.forks,
        watchers: repo.watchers,
        description: repo.description ? repo.description : '',


        owner: {
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url,
            login: repo.owner.login,
        }
    }





    const addToFavorite = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
        addFavorite( repoInfo )
        setIsFavorite( true )
    }

    const RemoveFromFavorite = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
        removeFavorite( repoInfo )
        setIsFavorite( false )
    }
    return (
        <div className='border rounded mb-2 hover:shadow-md hover:bg-gray-200 transition-all cursor-pointer '>


            <a href={repo.html_url} target='_blank' className='flex justify-between items-center py-7 px-7'>

                <a href={repo.owner.html_url} target='_blank' className='mr-5 text-left h-full text-center flex flex-col items-center basis-[65px]'>
                    <img src={repo.owner.avatar_url} alt="" className='h-[50px] w-[50px] rounded-full' />
                    <p>{repo.owner.login}</p>

                </a>

                <div className='text-center mr-5 max-w-[400px]'>
                    <h2 className='text-lg font-bold text-xl'>
                        {repo.full_name}
                    </h2>


                    <p className='text-sm'>
                        Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                        Watchers: <span className='font-bold'>{repo.watchers}</span>
                    </p>
                    <p className='text-sm font-thin'>
                        {repo?.description}
                    </p>

                </div>

                {isFavorite ?
                    <button
                        onClick={RemoveFromFavorite}
                        className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all basis-[90px]'>
                        Remove
                    </button>
                    :
                    <button
                        onClick={addToFavorite}
                        className='py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all basis-[90px] '>
                        Add
                    </button>

                }
            </a>
        </div>
    )
}