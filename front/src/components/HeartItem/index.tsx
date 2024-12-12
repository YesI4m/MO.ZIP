import React from 'react'
import defaultProfileImage from 'assets/image/default-profile-image.png'
import './style.css'
import { HeartListItem } from 'types/interface'

interface Props{
    heartListItem: HeartListItem;
}
//          component: HeartListItem          //
export default function HeartItem({ heartListItem }: Props) {

//          state: properties                    //
    const { profileImage, nickname } = heartListItem;

//          render : HeartListItem            //
    return (
        <div className='heart-list-item'>
            <div className='heart-list-item-profile-box'>
                <div className='heart-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='heart-list-item-nickname'>{nickname}</div>
        </div>
    )
}
