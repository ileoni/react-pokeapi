import Skeleton from "../../components/Skeleton";

function SkeletonPokedex()
{
    const range = Array(12).fill().map((_, i) => i);

    return (
        <>
        <div className="grid grid-cols-2 gap-32 md:grid-cols-4 justify-between">
            {
                range.map(key => (
                    <div key={key} className="h-[160px] md:h-[240px] w-[160px] md:w-[240px]">
                        <div className="h-[200px] grid justify-center">
                            <Skeleton type={'image'}/>
                        </div>
                        <div className="h-[40px] grid grid-cols-[40%_20%_10%] grid-flow-col justify-evenly items-center">
                            <Skeleton type={'text'}/>
                            <Skeleton type={'text'}/>
                            <Skeleton type={'icon'}/>                
                        </div>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default SkeletonPokedex;