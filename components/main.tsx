import FAB from "./fab";
import Grid from "./grid";

function Main() {
  return (
    <div>
      <FAB
        className='absolute bottom-8 right-8'
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        }
      />

      <Grid />

    </div>
  );
}

export default Main;
