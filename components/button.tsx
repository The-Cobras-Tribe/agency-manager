function Button(props: any) {
  const { children, onClick, icon, className } = props;
  return (
    <>
      <button
        className={'text-sm items-center pl-[16px] pr-[24px] py-[10px] leading-6 rounded-[100px] text-white bg-slate-800 dark:bg-slate-300 dark:text-slate-800 dark:hover:bg-slate-400 hover:bg-slate-600 transition ease-in-out duration-150 cursor-pointer font-[Roboto] flex flex-row line-height-[0] button-shadow ' + className}
        onClick={onClick}
      >
        <span className='mr-[8px] flex flex-col justify-center'>{icon}</span>
        {children}
      </button>
    </>
  );
}

export default Button;
