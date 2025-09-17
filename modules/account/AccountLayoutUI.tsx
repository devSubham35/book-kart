import React from 'react'
import Sidebar from './components/SideBar'

const AccountLayoutUI = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="container flex p-6 xl:px-0 py-6 gap-5">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default AccountLayoutUI