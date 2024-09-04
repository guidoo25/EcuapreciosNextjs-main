/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['m.media-amazon.com', 'www.computron.com.ec', 
    'www.artefacta.com', 'novicompu.vtexassets.com', 'crecos.vtexassets.com',
  'www.boyaca.com.ec', 'www.almacenesboyaca.com', 'www.almacenesboyaca.com.ec', 
  'www.boyaca.com','kywiec.vtexassets.com','www.deprati.com.ec','pycca.vteximg.com.br'],
}
}

module.exports = nextConfig
