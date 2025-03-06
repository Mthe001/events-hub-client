import { Helmet } from 'react-helmet-async';
import SwiperSlider from './Slider';
import { MarqueeDemo } from '@/components/Marquee3d';
import { TextAnimate } from '@/components/magicui/text-animate';




const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Local Event Hub 240</title>
            </Helmet> 

            <section className='w-[95%] mx-auto'>
                <SwiperSlider />
            </section> 

            <section className='w-[95%] my-1 mx-auto'>
               <div className='flex items-center flex-col my-5'>
                   
                    <TextAnimate animation='blurInUp' by='character' className='lg:text-6xl md:text-4xl text-xl text-stone-400 font-semibold  mb-4'>Most trusted Partners</TextAnimate>
                    <div className='w-[75%] mx-auto'>
                        <MarqueeDemo />
                    </div>
               </div>
            </section> 

            <section className="flex items-center justify-center min-h-screen">
               <h1>Hello Im home</h1>
            </section>

           

            

    
            
        </div>
    );
};

export default Home;