interface PropsTypes {
  title: string,
  text: string,
  color?: string
}

function DashboardInfo({ title, text, color }: PropsTypes) {

  return (
    <div className='rounded-[12px] border-l-4 border-r-4 border-l-dark w-full p-8 text-left py-8'>
      <p className='font-bold text-1xl text-dark'>{title}</p>
      <p className='text-slate-300 text-2xl font-light tracking-normal'>{text}</p>
    </div>
  )
}

export default DashboardInfo