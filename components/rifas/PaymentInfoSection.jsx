import { Controller } from 'react-hook-form'
import { CreditCard, Receipt, AlertCircle, Loader2, Copy, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('¡Copiado al portapapeles!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Error al copiar')
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="group inline-flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
      title="Copiar al portapapeles"
      type='button'
    >
      {label}
      {copied ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  )
}

const PaymentInfoSection = ({
  control,
  errors,
  paymentMethods,
  loading,
  selectedMethod,
}) => {
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  )

  return (
    <div className='space-y-6 bg-gradient-to-br from-black/40 to-primary/5 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,140,0.15)]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-primary flex items-center gap-2'>
          <CreditCard className='w-5 h-5 text-primary' />
          Información de Pago
        </h2>
        {selectedMethod && (
          <span className='text-sm text-gray-400'>
            Método seleccionado: {selectedPaymentMethod?.name}
          </span>
        )}
      </div>

      <div className='space-y-4'>
        {/* Método de Pago */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-200 flex items-center gap-2'>
            <CreditCard className='w-4 h-4 text-primary' />
            Método de Pago
          </label>
          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className='bg-black/50 border-gray-700/50 focus:border-primary/50 transition-colors'>
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span>Cargando métodos...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder='Selecciona un método de pago' />
                  )}
                </SelectTrigger>
                <SelectContent className='bg-gray-900 border-gray-700'>
                  {paymentMethods.map((method) => (
                    <SelectItem
                      key={method.id}
                      value={method.id}
                      className='text-gray-200 hover:bg-primary/20 focus:bg-primary/20'>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Referencia de Pago */}
        {selectedMethod && (
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-200 flex items-center gap-2'>
              <Receipt className='w-4 h-4 text-gray-400' />
              Referencia de Pago
            </label>
            <Controller
              name='paymentReference'
              control={control}
              rules={{
                required: 'La referencia de pago es requerida',
                minLength: {
                  value: 6,
                  message: 'La referencia debe tener al menos 6 caracteres',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className='bg-black/50 border-gray-700/50 focus:border-secondary/50 transition-colors'
                  placeholder='Número de referencia o ID de transacción'
                />
              )}
            />
            {errors.paymentReference && (
              <p className='text-red-400 text-sm'>
                {errors.paymentReference.message}
              </p>
            )}
          </div>
        )}

        {/* Información del método de pago */}
        {selectedPaymentMethod && (
          <div className='flex flex-col gap-4 p-5 rounded-lg bg-gradient-to-br from-blue-500/10 to-primary/5 border border-blue-500/20'>
            <div className='flex items-center gap-2'>
              <AlertCircle className='w-5 h-5 text-blue-400 flex-shrink-0' />
              <p className='font-medium text-blue-300'>Información de pago</p>
            </div>
            
            <div className='grid gap-3 text-sm'>
              {selectedPaymentMethod.name && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Método:</span>
                  <CopyButton text={selectedPaymentMethod.name} label={selectedPaymentMethod.name} />
                </div>
              )}
              {selectedPaymentMethod.identificationNumber && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Cédula:</span>
                  <CopyButton text={selectedPaymentMethod.identificationNumber} label={selectedPaymentMethod.identificationNumber} />
                </div>
              )}
              {selectedPaymentMethod.bankName && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Banco:</span>
                  <CopyButton text={selectedPaymentMethod.bankName} label={selectedPaymentMethod.bankName} />
                </div>
              )}
              {selectedPaymentMethod.accountNumber && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Cuenta:</span>
                  <CopyButton text={selectedPaymentMethod.accountNumber} label={selectedPaymentMethod.accountNumber} />
                </div>
              )}
              {selectedPaymentMethod.accountType && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Tipo:</span>
                  <CopyButton text={selectedPaymentMethod.accountType} label={selectedPaymentMethod.accountType} />
                </div>
              )}
              {selectedPaymentMethod.email && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Email:</span>
                  <CopyButton text={selectedPaymentMethod.email} label={selectedPaymentMethod.email} />
                </div>
              )}
              {selectedPaymentMethod.phone && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Teléfono:</span>
                  <CopyButton text={selectedPaymentMethod.phone} label={selectedPaymentMethod.phone} />
                </div>
              )}
              {selectedPaymentMethod.username && (
                <div className='flex flex-col md:flex-row justify-between items-center p-2 rounded bg-black/20 border border-blue-500/10'>
                  <span className='text-gray-400'>Usuario:</span>
                  <CopyButton text={selectedPaymentMethod.username} label={selectedPaymentMethod.username} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentInfoSection
