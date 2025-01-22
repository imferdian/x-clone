function LoadingBounce ({ w = '100' }) {
    const weight = `w-[${w}px]`;

    return (
        <div className={`relative ${weight} h-[60px] z-10`}>
            <div className="absolute w-5 h-5 bg-white rounded-full left-[15%] origin-[50%] animate-circle"></div>
            <div
                className="absolute w-5 h-5 bg-white rounded-full left-[45%] origin-[50%] animate-circle animation-delay-200"></div>
            <div
                className="absolute w-5 h-5 bg-white rounded-full right-[15%] origin-[50%] animate-circle animation-delay-300"></div>

            <div
                className="absolute w-5 h-1 bg-slate-900/90 rounded-full top-[62px] left-[15%] origin-[50%] z-[-1] blur-[1px] animate-shadow"></div>
            <div
                className="absolute w-5 h-1 bg-slate-900/90 rounded-full top-[62px] left-[45%] origin-[50%] z-[-1] blur-[1px] animate-shadow animation-delay-200"></div>
            <div
                className="absolute w-5 h-1 bg-slate-900/90 rounded-full top-[62px] right-[15%] origin-[50%] z-[-1] blur-[1px] animate-shadow animation-delay-300"></div>
        </div>
    )
}

export default LoadingBounce