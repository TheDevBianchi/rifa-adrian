'use client'

import { useEffect } from 'react'
import { useSettingsStore } from '@/store/use-settings-store'
import { PaymentMethodForm } from '@/components/settings/payment-method-form'
import { PaymentMethodList } from '@/components/settings/payment-method-list'
import { EditPaymentMethodModal } from '@/components/settings/edit-payment-method-modal'

export default function PaymentMethodsPage () {
  const { getPaymentMethods } = useSettingsStore()

  useEffect(() => {
    getPaymentMethods()
  }, [getPaymentMethods])

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Métodos de Pago</h1>
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <PaymentMethodForm />
        <PaymentMethodList />
      </div>
      <EditPaymentMethodModal />
    </div>
  )
}
