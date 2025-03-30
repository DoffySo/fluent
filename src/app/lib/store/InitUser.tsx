'use client'
import React, {useEffect, useRef} from 'react'
import {User} from "@supabase/auth-js";
import {useUser} from "@/app/lib/store/user";

export default function InitUser({user}: {user: User | undefined}) {
    const initState = useRef(false);
    useEffect(() => {
        if(!initState.current) {
            useUser.setState({user})
        }

        initState.current = true

        // eslint-disable-next-line
    }, [])

    return <></>
}