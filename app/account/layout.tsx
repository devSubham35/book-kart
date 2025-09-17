import AccountLayoutUI from '@/modules/account/AccountLayoutUI'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccountLayoutUI>
      {children}
    </AccountLayoutUI>
  )
}

export default AccountLayout