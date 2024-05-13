import { UserInformationComp } from '~/components/account/information'
import { HistoryPurchaseComp } from '~/components/history/history-purchase'

export const ViewAccountPage = () => {
  return (
    <div className='grid grid-cols-1 gap-4 mt-4 mx-2'>
      <UserInformationComp />
      <HistoryPurchaseComp />
    </div>
  )
}
