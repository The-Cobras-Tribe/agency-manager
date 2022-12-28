import { motion } from "framer-motion";

function Card(props: any) {
  const { title, description, icon, className } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={
        "h-full border border-gray-200 bg-graph-paper dark:bg-graph-paper-dark shadow-md dark:border-gray-700 flex flex-col justify-between " +
        " " +
        (icon ? "max-w-sm" : "max-w-lg") +
        className
      }
    >
      {icon && (
        <div className='flex items-center justify-center p-6 rounded-t-lg grow'>
          {icon}
        </div>
      )}
      <div className='p-5'>
        <h5 className='w-full mb-2 text-2xl font-bold tracking-tight text-left text-slate-800 dark:text-white'>
          {title}
        </h5>
        <p className='text-lg font-normal text-justify text-gray-700 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default Card;