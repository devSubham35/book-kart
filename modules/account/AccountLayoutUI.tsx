import React from 'react'
import Sidebar from './components/SideBar'

const AccountLayoutUI = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container flex p-6 xl:px-0 py-6 gap-5 h-[calc(100vh-4rem)]">

            <div className="h-full shrink-0 sticky top-6 self-start">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full overflow-y-auto pr-2 scrollbar-hidden">
                {children}
            </div>
        </div>
    )
}

export default AccountLayoutUI