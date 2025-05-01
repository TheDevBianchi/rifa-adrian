import Image from 'next/image'
import Navbar from './navbar'

export default function Header() {
  return (
    <>
      <Navbar />
      <header className='pt-20 bg-black'>
        <div className='container mx-auto px-4 md:px-6'>
          {/* Hero Section */}
          <div className='flex flex-col md:flex-row items-center justify-between py-12 md:py-20'>
            <div className='w-full md:w-1/2 space-y-6 text-center md:text-left mb-8 md:mb-0'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
                <span className='bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent'>Gana Grandes Premios</span>
                <br />
                <span className='text-white'>con Nuestras Rifas</span>
              </h1>
              <p className='text-gray-400 text-lg md:text-xl max-w-xl'>
                Participa en nuestras rifas exclusivas y ten la oportunidad de ganar increíbles premios con los mejores precios del mercado.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <a 
                  href='#rifas' 
                  className='bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium py-3 px-6 rounded-md transition-all duration-300 text-center'
                >
                  Ver Rifas Disponibles
                </a>
                <a 
                  href='/como-jugar' 
                  className='border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-medium py-3 px-6 rounded-md transition-all duration-300 text-center'
                >
                  Cómo Participar
                </a>
              </div>
            </div>
            <div className='w-full md:w-1/2 relative'>
              <div className='relative w-full aspect-square max-w-md mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-full blur-3xl'></div>
                <Image
                  src='/hero-image.webp'
                  alt='Premios de rifas'
                  width={500}
                  height={500}
                  className='relative z-10 object-cover rounded-xl'
                  priority
                />
                <div className='absolute -bottom-4 -right-4 bg-black border border-amber-500/50 rounded-lg p-4 shadow-xl z-20'>
                  <p className='text-amber-400 font-bold'>¡Próximo Sorteo!</p>
                  <p className='text-white text-sm'>1 de Junio, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className='w-full overflow-hidden'>
          <svg className='w-full h-16 md:h-24' viewBox='0 0 1440 74' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0,37 C240,74 480,0 720,37 C960,74 1200,0 1440,37 L1440,74 L0,74 Z' fill='#111111'></path>
          </svg>
        </div>
      </header>
    </>  
  )
}
