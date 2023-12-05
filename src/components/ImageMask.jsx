import './ImageMask.css';

function ImageMask({image, children})
{
    return (
        <div className='wrapper__image' style={{'--masking': `url(${image})`}}>
            <div className="image--masking">
                {children}
            </div>
        </div>
    );
}

export default ImageMask;