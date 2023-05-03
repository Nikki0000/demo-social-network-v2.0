import { Input } from "antd";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    className: any
}

const ProfileStatusWithHooks: FC<PropsType> = (props) => {


    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <>
            {!editMode &&
                <div>
                    <b>Status: </b> <span onClick={activateMode}>{props.status || '-----------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateMode} value={status}/>
            </div>
            }
        </>
    )

}

export default ProfileStatusWithHooks;