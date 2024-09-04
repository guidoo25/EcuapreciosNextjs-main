import Image from "next/image";

interface Props {
  fecha: string;
  iconSrc: string;
  precio: string;
}

const PriceInfoCard = ({ fecha, iconSrc, precio }: Props) => {
  return (
    <div className={`price-info_card`}>
      <p className="text-base text-black-100">{precio}</p>

      <div className="flex gap-1">
        <Image src={iconSrc} alt={precio} width={24} height={24} />

        <p className="text-2xl font-bold text-secondary">{precio}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard