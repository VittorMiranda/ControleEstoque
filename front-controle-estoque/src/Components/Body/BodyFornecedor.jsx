import FormFornecedor from '../Forms/FormsFornecedor';
import './Body.css';

const BodyFornecedor = () => {
    return(
        <main className='corpo'>
            <div className='principal'>
                <FormFornecedor></FormFornecedor>
            </div>
        </main>
    );
}

export default BodyFornecedor;