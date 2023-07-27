interface PropsTypes {
  title: number | string | undefined | null,
  text: string,
  color?: string,
  teamLogotype?: string
}

function DashboardInfo({ title, text, teamLogotype }: PropsTypes) {

  return (
    <div className='rounded-[12px] h-[100%] md:h-[400px] border-l-4 border-r-4 border-l-dark w-full p-8 text-left py-8 bg-white flex items-center justify-center'>
      <div className="text-center">
        {
          title === null || title === undefined
            ? <p className='text-slate-600 text-2xl font-light tracking-normal'>No data</p>
            : <>
              {
                teamLogotype && <img className="w-[100px] m-auto" src={teamLogotype} alt="Team Logotype" />
              }
              <p className='font-bold text-[44px] text-dark font-title'>{title}</p>
              <p className='text-slate-600 text-2xl font-light tracking-normal'>{text}</p>
            </>
        }
      </div>
    </div>
  )
}

export default DashboardInfo