import "./GlowUp.css";

const GlowUp = ({ children, imageRef, maskImage }) => {
    return (
        <div ref={imageRef} className="image--glow-up" style={{ "--mask-image": `url(${maskImage})` }}>
        { children }
        </div>
    );
}

export default GlowUp;