'use client'

import {useState, useEffect, createContext, useContext, use} from 'react'
import { useUser as useSupaUser, useSessionContext, User } from '@supabase/auth-helpers-react'
import {Subscription, UserDetails} from '@/types'

type UserContextType = {
    accessToken : string | null;
    user: User | null;
    userDetails :UserDetails | null;
    isLoading : boolean;
    subscription : Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
)

export interface Props{
    [propName : string] : any
}


// provder for user context
export const MyUserContextProvider = (props : Props) => {
    const {session, isLoading: isLoadingUser, supabaseClient: supabase} = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getUserDetails = () => {
        return supabase.from('user').select('*').single()
    }

    const getSubscription = () => {
        return supabase.from('subscription').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single()
    }
    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingData(true)

            Promise.allSettled([getUserDetails(), getSubscription()]).then((res) => {
                const userDetailsPromise = res[0];
                const subscriptionDetailsPromise = res[1];

                if(userDetailsPromise.status === 'fulfilled'){
                    setUserDetails(userDetailsPromise.value.data as UserDetails)
                }
                if(subscriptionDetailsPromise.status === 'fulfilled'){
                    setSubscription(subscriptionDetailsPromise.value.data as Subscription)
                }

                setIsLoadingData(false)
            })
        }
        else if(!user && !isLoadingUser && !isLoadingData){
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser])

    const value = {
        accessToken, user, userDetails, isLoading : isLoadingUser || isLoadingData, subscription
    }

    return (
        <UserContext.Provider value={value} {...props} />
    )
}


// hook acting as UserContext consumer
export const useUser = () => {
    const context = useContext(UserContext)

    if(!context){
        return new Error('useUser must be used with MyUserContextProvider')
    }

    return context
}

