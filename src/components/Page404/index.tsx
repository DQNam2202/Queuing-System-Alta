import React from 'react';
import './style.scss';
const Page404 = () => {
  return (
    <React.Fragment>
      <section className='page_404'>
        <div className='container'>
          <div className='row ml-[70px]'>
            <div className='col-sm-12'>
              <div className='col-sm-10 col-sm-offset-1  text-center'>
                <div className='four_zero_four_bg'>
                  <h1 className='text-center '>404</h1>
                </div>
                <div className='contant_box_404'>
                  <h3 className='h2'>Look like you're lost</h3>
                  <p>The page you are looking for not avaible!</p>
                  <button type='button' className='btn-animation mt-6'>
                    GO BACK HOME
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Page404;
