import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import '../styles/ActionsEdit.css'

const ActionsEdit = (props) => {
    return (
    <div>
        <button id={`action-delet-${props.id}`} onClick={props.onClickDelete} className='icon-button'>
            <FontAwesome.FaTrashO className='post-icon' />
        </button>
        <button id={`action-edit-${props.id}`} onClick={props.onClickEdit} className='icon-button'>
            <FontAwesome.FaEdit className='post-icon' />
        </button>
    </div>
    )
}

export default ActionsEdit
