import './ImageMask.css';

function ImageMask({imageRef, image, children})
{
    return (
        <div ref={imageRef} className='wrapper__image' style={{'--masking': `url(${image})`}}>
            <div className="image--masking">
                {children}
            </div>
        </div>
    );
}

export default ImageMask;