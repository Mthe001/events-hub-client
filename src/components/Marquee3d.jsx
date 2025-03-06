import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";


const reviews = [
    {
        name: "Amazon",
        username: "@amazon_official",
        body: "Events Hub is redefining event management with its seamless user experience and powerful tools. As a trusted partner, we are proud to collaborate with a platform that ensures efficiency and innovation in event planning.",
        img: "/public/amazon.png",
    },
    {
        name: "Apple",
        username: "@apple_global",
        body: "At Apple, we value creativity and seamless technology. Events Hub aligns with our vision by providing a streamlined and innovative platform for organizing events effortlessly.",
        img: "/public/apple.png",
    },
    {
        name: "Audi",
        username: "@audi_official",
        body: "Luxury and precision define Audi, and Events Hub mirrors these qualities in event management. A trusted partner that guarantees excellence in every experience.",
        img: "/public/audi.png",
    },
    {
        name: "BMW",
        username: "@bmw_global",
        body: "Events Hub drives event planning to new heights with cutting-edge solutions. As a brand focused on innovation, we recognize the platform as a leader in the industry.",
        img: "/public/bmw.png",
    },
    {
        name: "Coca-Cola",
        username: "@cocacola",
        body: "Bringing people together is at the heart of what we do. Events Hub shares our passion by connecting communities through seamless event experiences.",
        img: "/public/coca cola.png",
    },
    {
        name: "Google",
        username: "@google",
        body: "From AI-driven insights to seamless event coordination, Events Hub embodies innovation. We’re excited to support a platform that enhances user experiences globally.",
        img: "/public/google.png",
    },
    {
        name: "Mastercard",
        username: "@mastercard",
        body: "Secure and hassle-free transactions are key in event management, and Events Hub ensures just that. A trusted partner in creating smooth and reliable event experiences.",
        img: "/public/mastercard.png",
    },
    {
        name: "Nike",
        username: "@nike",
        body: "Just like every great event needs passion and energy, Events Hub delivers a platform that makes organizing events effortless and engaging.",
        img: "/public/nike.png",
    },
    {
        name: "Pepsi",
        username: "@pepsi_global",
        body: "Refreshing and dynamic, Events Hub brings a new energy to event planning. We are proud to collaborate with a platform that makes events more exciting.",
        img: "/public/pepsi.png",
    },
    {
        name: "Red Bull",
        username: "@redbull",
        body: "Events Hub gives wings to event organizers by simplifying planning and execution. A game-changer in the industry, just like us.",
        img: "/public/redbull.png",
    },
    {
        name: "Samsung",
        username: "@samsung",
        body: "Technology and innovation drive Samsung, and we see the same spirit in Events Hub. A trusted partner in revolutionizing the event industry.",
        img: "/public/samsung.png",
    },
    {
        name: "Visa",
        username: "@visa",
        body: "Global accessibility and seamless transactions are what we value. Events Hub ensures a smooth event experience with secure payment solutions.",
        img: "/public/visa.png",
    },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);



const ReviewCard = ({ img, name, username }) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col items-center",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <img className="w-24 h-24 object-contain" alt={name} src={img} />
            <figcaption className="mt-2 text-sm font-medium dark:text-white">
                {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </figure>
    );
};


export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}