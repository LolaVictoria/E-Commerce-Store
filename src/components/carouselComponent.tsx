type dealsProp = {
    dealsAdImage:string;
    dealsAd: string;
    dealsOffer: string;
}

const CarouselComponent: React.FC<dealsProp> = ({dealsAdImage, dealsAd, dealsOffer}) => {
    return (
        <div className="relative  h-72 w-[555px]">
            <img src={dealsAdImage} alt=""  className="h-full w-full"  style = {{objectFit: "cover" }}/>
            <div className="absolute top-4 left-10">
                <p className="text-[#BCBEBE] text-xs font-semibold">{dealsOffer}</p>
                <p className="w-64 text-[#fff] text-3xl font-semibold leading-8">
                   {dealsAd}
                </p>
            </div>
            <button className="bg-[#2ECF5A] rounded-lg w-28 h-10 absolute bottom-4 left-12">
                <a href="#" className="text-[#181818] font-semibold text-base">Shop Now</a>
            </button>
        </div>
    );
}
 
export default CarouselComponent;