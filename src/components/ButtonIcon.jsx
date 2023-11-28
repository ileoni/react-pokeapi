import "./ButtonIcon.css";

function ButtonIcon ({ icon, alt, text })
{
    return (
        <button className="wrapper__button bg-red">
            <div className="button__icon">
                <img src={icon} alt={alt} />
            </div>
            <div className="button__text font-16">{text}</div>
        </button>
    );
}

export default ButtonIcon;