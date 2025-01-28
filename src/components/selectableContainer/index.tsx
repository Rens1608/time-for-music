import Image from "next/image";

const SelectableContainer = ({ onClick, isSelected, imageSrc, title, description }: { onClick: React.MouseEventHandler<HTMLInputElement>, isSelected: boolean, imageSrc: string, title: string, description: string }) => {
    return <div className={` ${isSelected ? 'border-4 border-[#3758f9]' : 'border-4 dark:border-gray-600'} mt-5 mb-8 bg-gray-50 dark:bg-gray-500 w-64 h-64 rounded-xl overflow-hidden flex flex-col items-center justify-evenly`} onClick={onClick}>
        <Image width={60} height={60} src={imageSrc} alt="Image" className='h-[60px] dark:invert' />
        <p className="text-black font-bold dark:text-white">{title}</p>
        <p className="text-center italic text-sm">{description}</p>
    </div>
}

export default SelectableContainer;