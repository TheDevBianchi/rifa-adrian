import Link from 'next/link'

export default function SettingsPage () {
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Configuración</h1>
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <Link href='/dashboard/settings/payment-methods'>
          <div className='block p-6 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Métodos de Pago
            </h2>
            <p className='text-gray-400'>
              Gestiona y configura tus métodos de pago.
            </p>
          </div>
        </Link>
        <Link href='/dashboard/settings/dollar-price'>
          <div className='block p-6 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Ajustar Precio del Dólar
            </h2>
            <p className='text-gray-400'>
              Configura el precio del dólar para las transacciones.
            </p>
          </div>
        </Link>
        <Link href='/dashboard/settings/promos'>
          <div className='block p-6 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition'>
            <h2 className='text-xl font-semibold text-primary mb-2'>
              Promociones
            </h2>
            <p className='text-gray-400'>
              Configura las promociones para tus rifas.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
