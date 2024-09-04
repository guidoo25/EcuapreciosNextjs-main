import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
]

const categoryOptions = [
  { value: 'computadoras', label: 'Computadoras' },
  { value: 'Celulares', label: 'Celulares' },
  { value: 'consolas', label: 'Consolas' },
  { value: 'deportes-y-fitness', label: 'Fitness' },
  { value: 'televisores', label: 'Televisores' },
  { value: 'aires-acondicionados', label: 'Aires ' },
  { value: 'audio', label: 'audio' },
  { value: 'salud', label: 'Salud' },
  { value: 'hogar', label: 'Hogar' },
  { value: 'electrodomesticos', label: 'Electrodomésticos' },
  { value: 'relojes-smartwatchs-y-smartbands', label: 'Smartwatchs' },
  { value: 'bebes', label: 'Bebes' },
];


const Navbar = () => {
  return (
    <header className="w-full px-4 md:px-8 lg:px-16">
      <nav className="nav flex flex-wrap items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            <span className='text-blue-500'>Ecua</span><span className='text-yellow-500'>precios</span>          </p>
        </Link>

        <div className="relative group">
          <button className="bg-gray-200 rounded-md px-4 py-2">
            Categorías
          </button>

          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {categoryOptions.map((option) => (
                <Link href={`/categoria/${option.value}`} key={option.value}>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    {option.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar