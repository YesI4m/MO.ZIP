import React from 'react'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css'
import { FavoriteListItem } from 'types/interface'

interface Props{
    favoriteListItem: FavoriteListItem;
}
//----------componet : FavoriteListItem----------//
export default function FavoriteItem({ favoriteListItem }: Props) {

    //----------       properties       ----------//
    const { profileImage, nickname} = favoriteListItem;

//---------- render : FavoriteListItem---------- //  
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    )
}
