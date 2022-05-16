import React from 'react';

const Page404 = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <h2 className='mb-10 text-5xl font-bold leading-8'>
          Oops! Page not found.
        </h2>
        <div className=''>
          <img src='/images/404.svg' alt='logo_404' />
        </div>
        <h4 className='mt-10 mb-3 text-xl font-medium'>
          We can't find the page you're looking for
        </h4>
        <button type='button' className='btn-animation'>
          GO BACK HOME
        </button>
      </div>
    </div>
  );
};

export default Page404;
