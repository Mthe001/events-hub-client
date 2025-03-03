import { Helmet } from 'react-helmet-async';
import SwiperSlider from './Slider';



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Local Event Hub 240</title>
            </Helmet> 

            <section className='w-[95%] mx-auto'>
                <SwiperSlider />
            </section>

            <section className="flex items-center justify-center min-h-screen">
               <h1>Hello Im home</h1>
            </section>

           

            

    
            
        </div>
    );
};

export default Home;