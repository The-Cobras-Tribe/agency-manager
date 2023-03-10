import { motion } from 'framer-motion';

function FAB(props: any) {
  const { children, onClick, icon, className } = props;
  return (
    <motion.button
      type='button'
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
      className={
        "text-sm items-center px-[16px] py-[18px] leading-6 rounded-[16px] transition ease-in-out duration-150 cursor-pointer font-[Roboto] flex flex-row line-height-[0] button-shadow " +
        "bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white dark:hover:bg-slate-700 hover:bg-slate-400 active:bg-slate-600 dark:active:bg-slate-900 " +
        className
      }
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className='flex flex-col justify-center'>{icon}</span>
      {icon && children && <span className='mr-[12px]'>&nbsp;</span>}
      {children && <span className='mr-[4px]'>{children}</span>}
    </motion.button>
  );
}

export default FAB;
