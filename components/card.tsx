import { motion } from 'framer-motion';

function Card(props: any) {
    const { id, clientName, contractorName, date, status, onClick, className } = props;
    return (
        <div>
            <motion.div
                className={`rounded-md shadow-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer active:bg-slate-400 dark:active:bg-slate-900 ${className}`} onClick={
                    () => {
                        window.open(`/client/${id}`, '_self');
                        try { onClick() } catch (e) {
                            console.log(e);
                        }
                    }
                }>
                <div className="px-4 py-5 sm:px-6">
                    <div className="text-lg font-medium leading-5 text-gray-900 dark:text-slate-100">
                        {clientName}
                    </div>
                    <div className="mt-2 text-slate-700 dark:text-slate-300">

                        <p className="text-sm font-medium leading-5">
                            Contractor: {contractorName}
                        </p>
                        <p className="text-sm font-medium leading-5">
                            Status: {status}
                        </p>
                    </div>
                </div>
            </motion.div></div>
    );

}

export default Card;