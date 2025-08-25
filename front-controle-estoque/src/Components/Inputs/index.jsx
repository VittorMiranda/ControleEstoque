import './Inputs.css';

const Inputs = ({ label, type = "text", name, value, onChange, options }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            
            {type === "select" ? (
                <select name={name} value={value} onChange={onChange} className="input">
                    <option value="">Selecione...</option>
                    {options?.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input 
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    className="input" 
                />
            )}
        </div>
    );
}

export default Inputs;
