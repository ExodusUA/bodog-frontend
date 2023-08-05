import Loading from "../../../../UI/Loading"



interface PropsTypes {
  title: number | string | undefined | null,
  text: string,
  color?: string,
  teamLogotype?: string
}

function DashboardInfo({ title, text, teamLogotype }: PropsTypes) {

  return (
    <div className='dashboardBlock h-full rounded-[12px] border-l-4 border-r-4 border-l-dark w-full p-8 text-left py-8 bg-white flex items-center justify-center'>
      <div className="text-center md:h-[200px] 2xl:h-[250px] flex items-center">
        <div>
          {
            title === null || title === undefined
              ? <Loading w={'50px'} h="50px" />
              : <>
                {
                  teamLogotype && <img className="w-[100px] m-auto" src={teamLogotype} alt="Team Logotype" />
                }
                <p className='text-[24px] font-bold md:text-[38px] xl:text-[40px] 2xl:text-[44px] text-dark font-title'>{title}</p>
                <p className='text-1xl text-slate-600 md:text-2xl font-light tracking-normal'>{text}</p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardInfo