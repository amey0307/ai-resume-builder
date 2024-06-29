import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='flex justify-between px-10 p-4 shadow-md'>
            <Link to={'/'}><img src='/logo.svg' alt="logo" /></Link>
            {
                isSignedIn ? (
                    <div className='flex gap-2 items-center'>
                        <Link to={'/dashboard'}>
                            <Button variant="outline" >Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                )
                    :
                    (
                        <Link to={'/auth/sign-in'}>
                            <Button>Get Started</Button>
                        </Link>
                    )
            }

        </div>
    )
}

export default Header
